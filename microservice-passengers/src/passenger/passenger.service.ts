import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PASSENGER } from 'src/common/models/models';
import { PassengerDTO } from './dto/passenger.dto';
import { Model } from 'mongoose';

@Injectable()
export class PassengerService {
    constructor(@InjectModel(PASSENGER.name) private readonly model:
        Model<IPassenger>,) { }

    async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
        const newPassenger = new this.model(passengerDTO);
        return await newPassenger.save();
    }

    //metodo para obtener usuarios
    async findAll(): Promise<IPassenger[]> {
        return await this.model.find();
    }

    //metodo para obtener un usuario
    async findOne(id: string): Promise<IPassenger> {
        return await this.model.findById(id);
    }
    //metodo para actualizar usuario
    async update(id: string, passengerDTO: PassengerDTO): Promise<IPassenger> {
        return await this.model.findByIdAndUpdate(id, passengerDTO, { new: true });
    }
    //metodo para eliminar 
    async delete(id:string){
        await this.model.findByIdAndDelete(id);
        return{
            status:HttpStatus.OK,
            msg:'Pasajero eliminado '
        };
    }
}
