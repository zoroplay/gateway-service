import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import * as useragent from 'express-useragent';
import { Metadata } from '@grpc/grpc-js';
import { AuthService } from '../auth/auth.service';
import { CryptoService } from '../../crypto/crypto.service';
import { Reflector } from '@nestjs/core';
import { SKIP_AUDIT_KEY } from './skip-audit.decorator';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  private readonly sensitiveFields = [
    'password',
    'accessToken',
    'refreshToken',
    'authorization',
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
    private readonly reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    if (this.shouldSkipAudit(context)) {
      return next.handle();
    }

    const requestType = this.getRequestType(context);
    const {
      action,
      endpoint,
      method,
      additionalInfo,
      clientId,
      ipAddress,
      userAgent,
      authHeader,
      clientCode,
    } = this.extractRequestData(context);

    const keyBuffer = await this.cryptoService.validateClientAndGenerateKey(
      clientCode,
      clientId,
    );

    const key = keyBuffer.toString('hex');

    try {
      const request =
        requestType === 'http'
          ? context.switchToHttp().getRequest()
          : context.switchToRpc().getData();

      // 🔓 DECRYPT incoming request body (only for HTTP for simplicity here)
      // In your intercept() method, update the decryption block:
      if (requestType === 'http') {
        try {
          if (!endpoint.includes('encrypt') && !endpoint.includes('decrypt')) {
            if (!request.body?.data) {
              throw new BadRequestException('Encrypted data required');
            }
            request.body = this.cryptoService.decrypt(request.body.data, key);
          }
        } catch (err) {
          if (err.message.includes('decryption failed')) {
            throw new BadRequestException('Decryption failed - invalid key or data');
          }
          throw err;  
        }
      }

      return next.handle().pipe(
        map((response) => {
          // Get the actual request URL
          const requestUrl = requestType === 'http' 
            ? context.switchToHttp().getRequest().url 
            : endpoint;
  
          // Only skip encryption for /crypto/decrypt endpoint
          const isDecryptEndpoint = requestUrl.toLowerCase().includes('crypto/decrypt');
  
          if (isDecryptEndpoint) {
            return response; // Return raw response for decrypt endpoint
          }
  
          // Encrypt all other responses
          return this.cryptoService.encrypt(response, key);
        }),
        tap(async (response) => {
          const user = await this.resolveUser(authHeader, action, response);

          await this.authService.createLog({
            auditLog: {
              id: undefined, // Replace with a default or generated value if needed
              clientId,
              userId: typeof user === 'object' && 'id' in user ? user.id : 0,
              userName:
                (typeof user === 'object' &&
                  'username' in user &&
                  user.username) ||
                response.username ||
                '',
              action,
              endpoint,
              method,
              statusCode: this.getStatusCode(response, requestType),
              payload: this.sanitizeData(
                this.getRequestPayload(context, requestType),
              ),
              response: this.sanitizeData(response),
              ipAddress,
              userAgent,
              additionalInfo,
              timestamp: new Date().toISOString(),
            },
          });
        }),
      );
    } catch (error) {
      console.error('AuditLogInterceptor error:', error);
      // next.handle(); // Continue processing even if audit fails
      throw error; // disContinue and show error to client
    }
  }

  private shouldSkipAudit(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(SKIP_AUDIT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private getRequestType(context: ExecutionContext): 'http' | 'grpc' {
    return context.getType() === 'http' ? 'http' : 'grpc';
  }

  private extractRequestData(context: ExecutionContext) {
    const requestType = this.getRequestType(context);
    const ua = this.getUserAgent(context, requestType);

    return {
      ...this.getActionAndEndpoint(context),
      ...this.getNetworkInfo(context, requestType),
      additionalInfo: this.getUserAgentInfo(ua),
      authHeader: this.getAuthHeader(context, requestType)?.authorization,
      clientCode: this.getAuthHeader(context, requestType)?.clientCode,
      clientId: this.getAuthHeader(context, requestType)?.clientId,
    };
  }

  private getActionAndEndpoint(context: ExecutionContext) {
    const handlerName = context.getHandler().name;
    const className = context.getClass().name;
    const requestType = context.getType(); // "http" or "grpc"

    let endpoint = '';
    let method = '';

    if (requestType === 'http') {
      // For HTTP requests, return originalUrl and method (POST or GET)
      endpoint = context.switchToHttp().getRequest().originalUrl;
      method =
        context.switchToHttp().getRequest().method === 'GET' ? 'GET' : 'POST';
    } else if (requestType === 'rpc') {
      // For GRPC requests, return className and handlerName
      endpoint = `${className}/${handlerName}`;
      method = context.getType(); // This will be 'grpc' or 'rpc'
    }

    return {
      action: handlerName,
      endpoint,
      method,
    };
  }

  private async resolveUser(authHeader: string, action: string, response: any) {
    if (this.isLoginAction(action)) return 0;

    try {
      if (!authHeader) return this.getUserIdFromResponse(response);

      const token = this.extractToken(authHeader);
      if (!token) return 0;

      const { status, user } = await this.authService.validate(token);
      return user;
    } catch (err) {
      console.error('User validation error:', err.message);
      return 0;
    }
  }

  private getUserIdFromResponse(response: any): {
    id: number;
    username: string;
  } {
    return {
      id: response?.data?.id || response?.data?.userId || 0,
      username: response?.data?.referenceID || response?.data?.username || '',
    };
  }

  private getNetworkInfo(
    context: ExecutionContext,
    requestType: 'http' | 'grpc',
  ) {
    if (requestType === 'grpc') {
      const grpcContext = context.switchToRpc().getContext();
      return {
        clientId: context.switchToRpc().getData()?.clientId || 0,
        ipAddress: this.getGrpcIpAddress(grpcContext),
        userAgent: this.getGrpcUserAgent(grpcContext),
      };
    }

    const httpContext = context.switchToHttp().getRequest();
    return {
      clientId: httpContext.body?.clientId || 0,
      ipAddress: this.getHttpIpAddress(httpContext),
      userAgent: httpContext.headers['user-agent'] || 'unknown',
    };
  }

  private getGrpcIpAddress(context: any): string {
    try {
      const metadata: Metadata = context.metadata;
      const xForwardedFor = metadata.get('x-forwarded-for')[0]?.toString();
      if (xForwardedFor) return xForwardedFor;

      if (context.call && typeof context.call.getPeer === 'function') {
        const peer = context.call.getPeer();
        return peer.split(':')[1] || 'unknown';
      }
      return 'unknown';
    } catch {
      return 'unknown';
    }
  }

  private getHttpIpAddress(request: any): string {
    return (
      request.ip ||
      request.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      request.connection?.remoteAddress ||
      request.socket?.remoteAddress ||
      'unknown'
    );
  }

  private getGrpcUserAgent(context: any): string {
    try {
      const metadata: Metadata = context.metadata;
      return metadata.get('user-agent')[0]?.toString() || 'unknown';
    } catch {
      return 'unknown';
    }
  }

  private getUserAgent(
    context: ExecutionContext,
    requestType: 'http' | 'grpc',
  ) {
    const userAgentString =
      requestType === 'http'
        ? context.switchToHttp().getRequest().headers['user-agent']
        : this.getGrpcUserAgent(context.switchToRpc().getContext());

    return useragent.parse(userAgentString || '');
  }

  private getUserAgentInfo(ua: useragent.Details) {
    return {
      browser: ua.browser,
      version: ua.version,
      os: ua.os,
      platform: ua.platform,
      isMobile: ua.isMobile,
      isTablet: ua.isTablet,
      isDesktop: ua.isDesktop,
    };
  }

  private getAuthHeader(
    context: ExecutionContext,
    requestType: 'http' | 'grpc',
  ) {
    try {
      if (requestType === 'http') {
        const authorization =
          context.switchToHttp().getRequest().headers?.authorization || '';
        const clientCode = context.switchToHttp().getRequest().headers?.[
          'client-code'
        ];
        const clientId = context.switchToHttp().getRequest().headers?.[
          'client-id'
        ];

        if (!authorization && !clientCode) {
          throw new BadRequestException('Client headers are required');
        }

        return { authorization, clientCode, clientId };
      }

      const grpcContext = context.switchToRpc().getContext();
      if (grpcContext?.metadata?.get) {
        const authHeader = grpcContext.metadata.get('authorization');
        return authHeader?.[0]?.toString() || '';
      }
      return {};
    } catch {
      return {};
    }
  }

  private getRequestPayload(
    context: ExecutionContext,
    requestType: 'http' | 'grpc',
  ): any {
    return requestType === 'http'
      ? context.switchToHttp().getRequest().body
      : context.switchToRpc().getData();
  }

  private getStatusCode(response: any, requestType: 'http' | 'grpc'): number {
    if (requestType === 'http') {
      return response?.statusCode || response?.status || 200;
    }
    return this.mapGrpcStatusCode(response?.code);
  }

  private mapGrpcStatusCode(grpcCode?: number): number {
    const mapping: Record<number, number> = {
      0: 200, // OK
      1: 499, // CANCELLED (client closed request)
      2: 500, // UNKNOWN
      3: 400, // INVALID_ARGUMENT
      4: 504, // DEADLINE_EXCEEDED
      5: 404, // NOT_FOUND
      6: 409, // ALREADY_EXISTS
      7: 403, // PERMISSION_DENIED
      8: 429, // RESOURCE_EXHAUSTED
      9: 400, // FAILED_PRECONDITION
      10: 409, // ABORTED
      11: 400, // OUT_OF_RANGE
      12: 501, // UNIMPLEMENTED
      13: 500, // INTERNAL
      14: 503, // UNAVAILABLE
      15: 500, // DATA_LOSS
      16: 401, // UNAUTHENTICATED
    };
    return grpcCode !== undefined ? mapping[grpcCode] || 500 : 200;
  }

  private sanitizeData(data: any): any {
    if (!data) return 'null';

    // Skip sanitizing for "login" action
    if (data.action === 'login') {
      return data;
    }

    try {
      // Handle primitive types
      if (typeof data !== 'object') {
        return JSON.stringify(data);
      }

      // Handle arrays
      if (Array.isArray(data)) {
        return JSON.stringify(data.map((item) => this.sanitizeData(item)));
      }

      // Handle objects
      const sanitized = { ...data };
      for (const field of this.sensitiveFields) {
        if (sanitized[field]) {
          sanitized[field] = '**REDACTED**';
        }
        if (sanitized.data?.[field]) {
          sanitized.data[field] = '**REDACTED**';
        }
      }
      return JSON.stringify(sanitized);
    } catch (error) {
      console.error('Error sanitizing data:', error);
      return '{}';
    }
  }

  private isLoginAction(action: string): boolean {
    return action?.toLowerCase().includes('login');
  }

  private extractToken(authHeader: string): string {
    return authHeader?.split(' ')[1] || '';
  }
}
