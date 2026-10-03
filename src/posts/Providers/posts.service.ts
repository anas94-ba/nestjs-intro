import { Injectable } from '@nestjs/common';
import{UsersService} from '../../users/Providers/users.service.js'

@Injectable()
export class PostsService {
    constructor(
        private readonly usersService:UsersService
    ){

    }
    public findAll(userId:string){
        const user=this.usersService.find(userId)
        return[
            {
                user:user,
                id:"1",
                name:"hhj"       
            }
        ]

    }
}
