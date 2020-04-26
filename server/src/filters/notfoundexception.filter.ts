import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Response, Request } from 'express';
import { join } from 'path';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request: Request = ctx.getRequest();
        const response: Response = ctx.getResponse();

        console.log('[NotFoundExceptionFilter] ', request.url);
        const file = join(__dirname, '../../../client/build/index.html');
        console.log('File: ', file);
        response.sendFile(file);
    }
}