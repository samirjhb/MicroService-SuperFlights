import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserMSG } from 'src/common/constants';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDTO } from 'src/user/dto/user.dto';


@Injectable()
export class AuthService {

    constructor(
        private readonly clientProxy: ClientProxySuperFlights,
        private readonly jwtService: JwtService,
    ) { }

    private _clientProxyUser = this.clientProxy.clientProxyUsers();
    //Metodo para validar user 
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this._clientProxyUser.send(UserMSG.VALID_USER, {
            username,
            password,
        }).toPromise();
       
        //validacion
        if (user) return user;

        return null;
    }

    //Metodo para  ingresar
    async signIn(user: any) {
        const payload = {
            username: user.username,
            sub: user._id,
        };
        return { access_token: this.jwtService.sign(payload) };
    }


    //Metodo para registrar
    async signUp(userDTO:UserDTO){
        return await this._clientProxyUser.send(UserMSG.CREATE, userDTO).toPromise();
    }
}
