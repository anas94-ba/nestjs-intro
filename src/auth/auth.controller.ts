import { Controller, Get } from '@nestjs/common';
import{AuthService} from './providers/auth.service.js';
import { ApiTags } from '@nestjs/swagger';  

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService : AuthService){

    }
    @Get('login')
    public login(){
        return this.authService.login("email","password","1");
    }
}
