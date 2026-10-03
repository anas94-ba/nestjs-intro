import { Injectable , Inject,forwardRef } from '@nestjs/common';
import { UsersService } from '../../users/Providers/users.service.js';

@Injectable()
export class AuthService {
    
     constructor(
            @Inject(forwardRef(()=>UsersService))
            private readonly usersService:UsersService
        ){
    
        }
    public login(email:string , password:string , id:string){
        const user=this.usersService.find(id);
        return "Token_Sample";
    }

    public isAuth(){
        return true;
    }


}
