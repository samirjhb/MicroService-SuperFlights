//Exportar la clase
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class FlightDTO {
    // Utilizar la clase validation  para validar los datos ingresado 
    @ApiProperty()// Decorador Swagger para mostrar  en la api las propiedades 
    @IsNotEmpty()
    @IsString()
    //Propiedades que vamos a utilizar
    readonly pilot: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly airplane: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly destinationCity: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    readonly flightDate: Date;

}