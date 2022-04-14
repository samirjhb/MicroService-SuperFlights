import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMSG } from 'src/common/constants';
//import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';



@Controller()
export class FlightController {

    //inyerctar el servicio de vuelo
    constructor(private readonly fligthService: FlightService) { }

    //creacion de  vuelos
    @MessagePattern(FlightMSG.CREATE)
    create(@Payload() flightDTO: FlightDTO) {
        return this.fligthService.create(flightDTO);
    }
    //obtener vuelos
    @MessagePattern(FlightMSG.FIND_ALL)
    findAll() {
        return this.fligthService.findAll();
    }

    //Obtener vuelo por id
    @MessagePattern(FlightMSG.FIND_ONE)
    findOne(@Payload() id: string) {
        return this.fligthService.findOne(id);
    }

    //Actualizar vuelo 
    @MessagePattern(FlightMSG.UPDATE)
    update(@Payload() payload) {
        return this.fligthService.update(payload.id, payload.flightDTO);
    }

    //Eliminar vuelo
    @MessagePattern(FlightMSG.DELETE)
    delete(@Payload() id: string) {
        return this.fligthService.delete(id);
    }



    //Agregar un pasajero 
    @MessagePattern(FlightMSG.ADD_PASSENGER)
    addPassenger(@Payload() payload) {
        return this.fligthService.addPassenger(payload.flightId, payload.passengerId);
    }
}
