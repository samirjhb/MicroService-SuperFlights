import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { identity, Observable } from 'rxjs';
import { PassengerMSG } from 'src/common/constants';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { PassengerDTO } from './dto/passenger.dto';


@ApiTags('passengers') //Tags pasajeros
@Controller('api/v2/passenger')
export class PassengerController {

    constructor(private readonly clientProxy: ClientProxySuperFlights){}
    private _clientProxyPassenger=this.clientProxy.clientProxyPassenger();
    
    
    //Crear un pasajero
    @Post()
    create(@Body() passengerDTO:PassengerDTO): Observable<IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.CREATE, passengerDTO);
    }

    //Obtener todo los pasajeros 
    @Get()
    findAll(): Observable<IPassenger []>{
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL, '');
    }

    //Obtener un pasajero
    @Get(':id')
    findOne(@Param('id') id:string): Observable <IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, id)
    }

    //Actualizar pasajero
    @Put(':id')
    update(@Param('id') id:string, @Body() passengerDTO:PassengerDTO): Observable <IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.UPDATE, {id, passengerDTO});
    }

    //Eliminar pasajero 
    @Delete(':id')
    delete(@Param('id') id: string ): Observable <any>{
        return this._clientProxyPassenger.send(PassengerMSG.DELETE, id);
    }



}
