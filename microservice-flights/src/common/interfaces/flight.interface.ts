import { IPassenger } from "./passenger.interface";
import { IWeather } from "./weather.location";

export interface IFlight extends Document {
    //Propiedades que vamos a utilizar
     _id?: string;
     pilot: string;
     airplane: string;
     destinationCity: string;
     flightDate: Date;
    //Proiedad de la interface de passenger
    passengers: IPassenger[];
    //Propiedades de la interface de clima
    weather: IWeather[];

}