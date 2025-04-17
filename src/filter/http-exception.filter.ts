import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res: Response = ctx.getResponse<Response>();
    const req: Request = ctx.getRequest<Request>();
    const status: HttpStatus = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    if (status === HttpStatus.BAD_REQUEST) {
      return res.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
        message: Array.isArray(exceptionResponse.message)
          ? exceptionResponse.message
          : [exceptionResponse.message],
        error: exceptionResponse.error || 'Bad Request',
      });
    }

    res.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: exceptionResponse.message,
      error: exceptionResponse.error || 'Http Exception',
    });
  }
}
