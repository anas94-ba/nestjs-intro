import { Controller, Get } from '@nestjs/common';
import{AuthService} from './providers/auth.service.js'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){

    }
    @Get('login')
    public login(){
        return this.authService.login("email","password","1");
    }
}
