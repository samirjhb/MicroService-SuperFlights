import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";



@Catch()
export class AllExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(AllExceptionFilter.name);
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();// constante  que sera nuestro consteto
        const res = ctx.getResponse();// Constante de respuesta
        const req = ctx.getRequest();// constante requisto

        const status = exception instanceof HttpException ? exception.getStatus() :
            HttpStatus.INTERNAL_SERVER_ERROR; //Constante de estado


        const msg = exception instanceof HttpException ? exception.getResponse() : exception;   //constante para el  mensaje 


        this.logger.error(`Status ${status} Error: ${JSON.stringify(msg)}`);

        res.status(status).json({
            timestamps: new Date().toISOString(),
            path: req.url,
            error: msg
        });
    }

}