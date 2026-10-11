import { Controller , Get , Param, Post , Query , ParseIntPipe ,DefaultValuePipe, Body , Headers ,Ip,ValidationPipe, Patch} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { GetUsersParamDto } from './dtos/get-users-params.dto.js';
import { PatchUserDto } from './dtos/patch-user.dto.js';
import { UsersService } from './Providers/users.service.js';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('users')
@ApiTags('Users')
export class UsersController{
    constructor(
        //inject user service 
        private readonly usersService : UsersService){

    } 
    @Get('/:id')
    @ApiQuery({name:"limit",description:"The limit of the users to be fetched",required:false})
    @ApiQuery({name:"page",description:"The page of the users to be fetched",required:false})
    @ApiOperation({summary:"Get all users or a specific user by id"})
    @ApiResponse({status:200,description:"The users were fetched successfully"})
    public getUsers(@Param() getUsersParamDto :GetUsersParamDto , @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit :any , @Query('page',new DefaultValuePipe(1),ParseIntPipe) page:any ){
        
        return this.usersService.getAll(getUsersParamDto,limit,page);
    }
    @Post()
    public createUsers(@Body() createUserDto:CreateUserDto , @Headers() headers:any ,@Ip() ip:any){
        return this.usersService.createUser(createUserDto);
    }
    @Patch()
    public patchUser(@Body() patchUserDto:PatchUserDto){
        return patchUserDto;
    }
}

