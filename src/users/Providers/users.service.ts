import { Injectable,Inject,forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-params.dto.js';
import { AuthService } from '../../auth/providers/auth.service.js';


@Injectable()
export class UsersService {

    constructor (
        @Inject(forwardRef(()=>AuthService))
        private readonly authService:AuthService
    ){

    }
    public getAll(getUsersParamDto :GetUsersParamDto,limit :number,page:number){
        
        return[
            {
                first_name:"anas",
                email:"anas@gmail.com"

            }
        ]
    }

    public findOneById(getUsersParamDto :GetUsersParamDto,limit :number,page:number){
        return[
            {
                first_name:"anas",
                email:"anas@gmail.com"

            }
        ]
    }
    public find(txt:string){
        const auth= this.authService.isAuth();
        console.log(auth);
        return[
            {
                first_name:"anas",
                email:"anas@gmail.com"
            }
        ]
    }
}
