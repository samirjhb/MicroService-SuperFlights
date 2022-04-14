import { HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {
    }

    //metodo para verificar constraseña de usuairo con respecto a la base de datos
    async checkPassword(password: string, passwordDB:string): Promise<boolean>{
        return await bcrypt.compare(password, passwordDB);
    }

    //metodo encontrar por usuario
    async findByUsername(username: string){
        return await this.model.findOne({username});
    }
    //metodo
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async create(userDTO: UserDTO): Promise<IUser> {
        const hash = await this.hashPassword(userDTO.password);
        const newUser = new this.model({ ...userDTO, password: hash });
        return await newUser.save();
    }


    //metodo para obtener usuarios
   async findAll():Promise<IUser[]> {
       return await this.model.find();
   }

   //metodo para obtener un usuario
   async findOne(id: string): Promise<IUser> {
       return await this.model.findById(id);
       
   }

   //metodo para actualizar usuario
   async update(id:string, userDTO:UserDTO): Promise<IUser>{
       const hash = await this.hashPassword(userDTO.password);
       const user = {...userDTO, password:hash};
       return await this.model.findByIdAndUpdate(id, user, { new: true });
   }

   //metodo para eliminar usuario
   async delete(id:string){
        await this.model.findByIdAndDelete(id);
       return {status: HttpStatus.OK, msg:"Delete user'"};
   }


}
