import { isInt, IsInt,IsOptional } from "class-validator";
import {Type} from 'class-transformer'

export class GetUsersParamDto{
    @IsInt()
    @Type(()=>Number)
    id:number;
}