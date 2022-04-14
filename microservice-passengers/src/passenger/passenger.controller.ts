import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PassengerMSG } from 'src/common/constants';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';




@Controller()
export class PassengerController {
    //Para utilizar los servicio inyectar en el constructor
    constructor(private readonly passengerServicio: PassengerService) { }

    //Crear pasajero
    @MessagePattern(PassengerMSG.CREATE)
    create(@Payload() passengerDTO: PassengerDTO) {
        return this.passengerServicio.create(passengerDTO);
    }

    // Obtener todos los pasajeros
    @MessagePattern(PassengerMSG.FIND_ALL)
    findAll() {
        return this.passengerServicio.findAll();
    }

    //Obtener  pasajero con id 
    @MessagePattern(PassengerMSG.FIND_ONE)
    findOne(@Payload() id: string) {
        return this.passengerServicio.findOne(id);
    }

    //Actualizar pasajero
    @MessagePattern(PassengerMSG.UPDATE)
    update(@Payload() payload) {
        return this.passengerServicio.update(payload.id, payload.passengerDTO);
    }


    // Eliminar pasajero
    @MessagePattern(PassengerMSG.DELETE)
    delete(@Payload() id: string) {
        return this.passengerServicio.delete(id);
    }

}
