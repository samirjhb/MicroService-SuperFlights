import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabbitMQ } from "../constants";


@Injectable()
export class ClientProxySuperFlights {
    constructor(private readonly config: ConfigService) { }


    //Generar conexion de Usuario 
    clientProxyUsers(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.UserQueue,
            },
        });
    }


    //Generar conexion de pasajero
    clientProxyPassenger(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.PassengerQueue,
            },
        });
    }


    //Generar conexion de vuelos
    clientProxyFlights(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.FlightQueue,
            },
        });

    }
}