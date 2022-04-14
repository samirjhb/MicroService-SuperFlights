import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    //se tomara los datos de la interface user.interface.ts
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
