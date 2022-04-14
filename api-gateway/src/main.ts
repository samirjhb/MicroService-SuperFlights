import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //importar la Excepcion de manera global 
  app.useGlobalFilters(new AllExceptionFilter());// Excepcion de filtro de manera global 
  app.useGlobalInterceptors(new TimeOutInterceptor()); //importar los interceptores de timeout

  //Para utilizar Swagger - Configuracion
  const options = new DocumentBuilder()
  .setTitle('SuperFlight API')
  .setDescription('Scheduled Flights App')
  .setVersion('2.0.0')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app,document, {
    swaggerOptions: {
      filter: true,
    }
  });

  await app.listen(process.env.port || 3000);
}
bootstrap();

