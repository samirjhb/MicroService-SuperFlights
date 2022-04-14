import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PassengerController } from './passenger/passenger.controller';
import { PassengerModule } from './passenger/passenger.module';
import { FlightModule } from './flight/flight.module';
import { UserController } from './user/user.controller';
import { FlightController } from './flight/flight.controller';
import { ProxyModule } from './common/proxy/proxy-module';

@Module({
  //Configuracion de Config Module  para poder importar nuestro archivo de variable de entorno
  imports: [
    ConfigModule.forRoot({
      envFilePath:['.env.development'],
      isGlobal:true,
    }),
    UserModule,
    PassengerModule,
    FlightModule,
    ProxyModule

  ],
  controllers: [AppController, PassengerController, UserController, FlightController],
  providers: [AppService],
})
export class AppModule {}
