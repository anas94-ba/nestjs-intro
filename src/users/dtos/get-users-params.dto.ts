import { isInt, IsInt,IsOptional } from "class-validator";
import {Type} from 'class-transformer'
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUsersParamDto{
    @ApiPropertyOptional({description:"The id of the user"})
    @IsInt()
    @Type(()=>Number)
    id:number;
}