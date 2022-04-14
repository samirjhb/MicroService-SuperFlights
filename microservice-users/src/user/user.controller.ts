import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/constants';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';


@Controller()
export class UserController {
    //importar servicio
    constructor(private readonly userService: UserService) { }


    //Crear usuario 
    @MessagePattern(UserMSG.CREATE)
    create(@Payload() userDTO: UserDTO) {
        return this.userService.create(userDTO);
    }

    //Obtener usuarios
    @MessagePattern(UserMSG.FIND_ALL)
    findAll() {
        return this.userService.findAll();
    }

    //Obtener usuario
    @MessagePattern(UserMSG.FIND_ONE)
    findOne(@Payload() id: string) {
        return this.userService.findOne(id);
    }

    //Actualizando nuestro usuarios
    @MessagePattern(UserMSG.UPDATE)
    update(@Payload() payload:any) {
        return this.userService.update(payload.id, payload.userDTO);
    }

    //Eliminar el usuario
    @MessagePattern(UserMSG.DELETE)
    delete(@Payload() id: string) {
        return this.userService.delete(id);

    }

}
