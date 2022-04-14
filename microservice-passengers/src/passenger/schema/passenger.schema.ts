import * as mongoose from 'mongoose';

export const PassengerSchema = new mongoose.Schema(
    {//paramentro 
        name: { type: String, required: true },
        email: { type: String, required: true },
    });

 //validacion de que el email sea uno y no se repita   
PassengerSchema.index({ email: 1 }, { unique: true });