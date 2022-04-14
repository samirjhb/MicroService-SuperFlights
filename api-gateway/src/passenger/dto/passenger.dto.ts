//Exportar la clase de nuestro dto
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class PassengerDTO{
    @ApiProperty()// Decorador Swagger para mostrar  en la api las propiedades 
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @ApiProperty()// Decorador Swagger para mostrar  en la api las propiedades 
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}