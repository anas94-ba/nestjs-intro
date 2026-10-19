import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import{AuthService} from './providers/auth.service.js';
import { ApiTags } from '@nestjs/swagger';  
import { SignInDto } from './dtos/signin.dto.js';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService : AuthService){

    }
    @Get('login')
    public login(){
        return ;
    }

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    public signIn(@Body() signInDto:SignInDto){
        return this.authService.login(signInDto) ;
    }
}
