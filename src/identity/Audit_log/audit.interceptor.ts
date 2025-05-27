import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
  HttpException,
  HttpStatus,
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
  private readonly ADMIN_PATHS = ['/admin', '/v2/admin'];
  private readonly NON_ENCRYPT_PATHS = ['/games', '/gaming', '/webhook'];

  constructor(
    private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
    private readonly reflector: Reflector,
  ) {}

  private shouldSkipAudit(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(SKIP_AUDIT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private safeStringify(obj: any): string {
    const seen = new WeakSet();

    return JSON.stringify(obj, function (key, value) {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular]';
        }
        seen.add(value);
      }
      return value;
    });
  }

  private isAdminEndpoint(url: string): boolean {
    return this.ADMIN_PATHS.some((path) => url.toLowerCase().includes(path));
  }

  private isEncryptPath(url: string): boolean {
    console.log('accessed endpoint', url);
    return !this.NON_ENCRYPT_PATHS.some((path) => url.toLowerCase().includes(path));
  }

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
      signature,
      apiKey
    } = this.extractRequestData(context);

    const isAdmin = this.isAdminEndpoint(endpoint);
    const isEncryptEndpoint = this.isEncryptPath(endpoint);

    // Key generation with validation
    let key: string;
    try {
      if (isEncryptEndpoint && clientId !== '4') {

        const keyBuffer = await this.cryptoService.validateClientAndGenerateKey(
          clientId
        );

        if (!keyBuffer) {
          throw new HttpException(
            'Failed to generate encryption key',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }

        key = keyBuffer.toString('hex');

        if (!key || key.length === 0) {
          throw new HttpException(
            'Invalid encryption key',
            HttpStatus.BAD_REQUEST,
          );
        }

        if (key !== apiKey) {
          throw new HttpException(
            'Invalid api key provided',
            HttpStatus.BAD_REQUEST,
          );
        }

        const encrypted = this.cryptoService.compareKeys(key, signature);

        if (!encrypted) {
          throw new HttpException(
            'Invalid signature key provided',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } catch (error) {
      console.error('Key generation error:', error);
      throw new HttpException(
        'Encryption setup failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      // const request =
      //   requestType === 'http'
      //     ? context.switchToHttp().getRequest()
      //     : context.switchToRpc().getData();

      // // Decrypt incoming request body
      // if (
      //   requestType === 'http' &&
      //   ['POST', 'PUT', 'PATCH'].includes(request.method) &&
      //   request?.body?.data
      // ) {
      //   try {
      //     if (!endpoint.includes('encrypt') && !endpoint.includes('decrypt')) {
      //       request.body = this.cryptoService.decrypt(request.body.data, key);
      //     }
      //   } catch (err) {
      //     if (err.message.includes('decryption failed')) {
      //       throw new BadRequestException(
      //         'Decryption failed - invalid key or data',
      //       );
      //     }
      //     throw err;
      //   }
      // }

      return next.handle().pipe(
        // Response handling and encryption
        // map((response) => {
          
        // }),
        
        tap(async (response) => {
          if (!isAdmin) return; // skip non-admin logging
          const user = await this.resolveUser(authHeader, action, response);

          await this.authService.createLog({
            auditLog: {
              id: undefined,
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
        // Error handling
        catchError((error) => {
          console.error('AuditLogInterceptor pipeline error:', error);
          if (error instanceof HttpException) {
            throw error;
          }
          throw new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
    } catch (error) {
      console.error('AuditLogInterceptor setup error:', error);
      throw error;
    }
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
      clientId: this.getAuthHeader(context, requestType)?.clientId,
      apiKey: this.getAuthHeader(context, requestType)?.apiKey,
      signature: this.getAuthHeader(context, requestType)?.signature,
    };
  }

  private getActionAndEndpoint(context: ExecutionContext) {
    const handlerName = context.getHandler().name;
    const className = context.getClass().name;
    const requestType = context.getType();

    let endpoint = '';
    let method = '';

    if (requestType === 'http') {
      endpoint = context.switchToHttp().getRequest().originalUrl;
      method =
        context.switchToHttp().getRequest().method === 'GET' ? 'GET' : 'POST';
    } else if (requestType === 'rpc') {
      endpoint = `${className}/${handlerName}`;
      method = context.getType();
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

        const clientId = context.switchToHttp().getRequest().headers?.[
          'sbe-client-id'
        ];
        const apiKey = context.switchToHttp().getRequest().headers?.[
          'sbe-api-key'
        ];

        const signature = context.switchToHttp().getRequest().headers?.[
          'sbe-api-signature'
        ];

        // if (!authorization && !clientId) {
        //   throw new BadRequestException('Client headers are required');
        // }

        return { authorization, clientId, signature, apiKey };
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
      1: 499, // CANCELLED
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

    if (data.action === 'login') {
      return data;
    }

    try {
      if (typeof data !== 'object') {
        return JSON.stringify(data);
      }

      if (Array.isArray(data)) {
        return JSON.stringify(data.map((item) => this.sanitizeData(item)));
      }

      const sanitized = { ...data };
      for (const field of this.sensitiveFields) {
        if (sanitized[field]) {
          sanitized[field] = '**REDACTED**';
        }
        if (sanitized.data?.[field]) {
          sanitized.data[field] = '**REDACTED**';
        }
      }
      // return this.safeStringify(sanitized);
      return true
    } catch (error) {
      console.error('Error sanitizing data:', error);
      return true;
      // return this.safeStringify({
      //   error: 'Failed to sanitize',
      //   message: error.message,
      // });
    }
  }

  private isLoginAction(action: string): boolean {
    return action?.toLowerCase().includes('login');
  }

  private extractToken(authHeader: string): string {
    return authHeader?.split(' ')[1] || '';
  }
}
