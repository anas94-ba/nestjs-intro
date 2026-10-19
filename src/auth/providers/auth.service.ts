import { Injectable , Inject,forwardRef } from '@nestjs/common';
import { UsersService } from '../../users/Providers/users.service.js';
import { SignInDto } from '../dtos/signin.dto.js';
import { SignInProvider } from './sign-in.provider.js';

@Injectable()
export class AuthService {
    
     constructor(
            @Inject(forwardRef(()=>UsersService))
            private readonly usersService:UsersService,
            private readonly signInProvider:SignInProvider,
        ){
    
        }
    public async login(signInDto :SignInDto){
        
        return await this.signInProvider.signIn(signInDto);
    }

    public isAuth(){
        return true;
    }


}
