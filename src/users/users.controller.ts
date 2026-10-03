import { Controller , Get , Param, Post , Query , ParseIntPipe ,DefaultValuePipe, Body , Headers ,Ip,ValidationPipe, Patch} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { GetUsersParamDto } from './dtos/get-users-params.dto.js';
import { PatchUserDto } from './dtos/patch-user.dto.js';
import { UsersService } from './Providers/users.service.js';

@Controller('users')
export class UsersController{
    constructor(
        //inject user service 
        private readonly usersService : UsersService){

    } 
    @Get('/:id')
    public getUsers(@Param() getUsersParamDto :GetUsersParamDto , @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit :any , @Query('page',new DefaultValuePipe(1),ParseIntPipe) page:any ){
        
        return this.usersService.getAll(getUsersParamDto,limit,page);
    }
    @Post()
    public createUsers(@Body() createUserDto:CreateUserDto , @Headers() headers:any ,@Ip() ip:any){
        return "you sent a post user to users endpoint";
    }
    @Patch()
    public patchUser(@Body() patchUserDto:PatchUserDto){
        return patchUserDto;
    }
}

