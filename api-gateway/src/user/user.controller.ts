import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UserMSG } from 'src/common/constants';
import { IUser } from 'src/common/interfaces/user.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDTO } from './dto/user.dto';


@ApiTags('users')//tags de usuarios 
@Controller('api/v2/user')
export class UserController {
    //Inyectar nuestro proxy
    constructor(private readonly clientProxy: ClientProxySuperFlights) { }
    private _clientProxyUser = this.clientProxy.clientProxyUsers();

    //Crear usuario
    @Post()
    create(@Body() userDTO = UserDTO): Observable<IUser> {
        return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
    }

    //Obtener todo los usuarios 
    @Get()
    findAll(): Observable<IUser[]>{
        return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
    }

    //Obtener un usuario 
    @Get(':id')
    findOne(@Param('id') id:string):Observable<IUser>{
        return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
    }

    //Actualizar usuario 
    @Put(':id')
    update(@Param('id') id:string, @Body() userDTO=UserDTO):Observable<IUser> {
        return this._clientProxyUser.send(UserMSG.UPDATE, {id, userDTO});
    }

    //Eliminar usuario
    @Delete(':id')
    delete(@Param('id') id:string): Observable<any>{
        return this._clientProxyUser.send(UserMSG.DELETE, id);
    }


}
