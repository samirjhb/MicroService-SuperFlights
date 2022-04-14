import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { Model } from 'mongoose';
import { FlightDTO } from './dto/flight.dto';
//importancion de libreria para  el clima
import axios from 'axios';
import * as moment from 'moment';
import { ILocation } from 'src/common/interfaces/location.interface';
import { IWeather } from 'src/common/interfaces/weather.location';

@Injectable()
export class FlightService {
    //inyerctar nuestro modelo
    constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
    ) { }

    //Metodo par obtener la ubicacion 
    async getLocation (destinationCity:string):Promise<ILocation>{
        const {data} = await axios.get(`https://www.metaweather.com/api/location/search/?query=${destinationCity}`);
        return data[0]; //objeto dela ubicacion
    }

    //Metodo para obtener clima
    async getWeather(woeid:number, flightDate: Date): Promise<IWeather[]>{
        const dateFormat = moment.utc(flightDate).format();

        const year = dateFormat.substring(0, 4);
        const month = dateFormat.substring(5, 7);
        const day = dateFormat.substring(8, 10);

        const { data } = await axios.get(`https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${day}/`,);

        return data;
    }

    //Metodo para asignar el clima
     assign({_id, pilot, airplane, destinationCity,  flightDate, passengers}:IFlight, weather:IWeather[]):IFlight{
         return Object.assign({_id, pilot, airplane, destinationCity,  flightDate, passengers, weather});
     };

    //crear pasajero 
    async create(flightDTO: FlightDTO): Promise<IFlight> {
        const newFlight = new this.model(flightDTO);
        return await newFlight.save();
    }

    //metodo para obtener usuarios
    async findAll(): Promise<IFlight[]> {
        return await this.model.find().populate('passengers');
    }

    //metodo para obtener un vuelo
    async findOne(id: string): Promise<IFlight> {
        const flight = await this.model.findById(id).populate('passengers');
        const location:ILocation = await this.getLocation(flight.destinationCity); 
        const weather:IWeather[] = await this.getWeather(location.woeid, flight.flightDate);
        return  this.assign(flight, weather);
    }

    //Metodo para actualizar un vuelo
    async update(id: string, flightDTO: FlightDTO): Promise<IFlight> {
        return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
    }

    //Metodo para eliminar un vuelo 
    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
        return {
            status: HttpStatus.OK,
            msg: 'Vuelo eliminado'
        };
    }

    //Metodo para agregar pasajero 

    async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
        return await this.model.findByIdAndUpdate(flightId, {
            $addToSet: { passengers: passengerId },
        },
            { new: true }
        ).populate('passengers');
    }
}