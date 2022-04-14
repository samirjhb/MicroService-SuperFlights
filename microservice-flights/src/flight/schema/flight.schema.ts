//Conexion a la base de datos

import * as mongoose from 'mongoose';

export const FlightSchema = new mongoose.Schema({
    //paramentro 
    pilot: { type: String, required: true },
    airplane: { type: String, required: true },
    destinationCity: { type: String, required: true },
    flightDate: { type: Date, required: true },
    //Esquema agregado de passenger
    passengers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'passengers'
    }],

},
    { timestamps: true },
);

