import { Injectable,Inject,forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-params.dto.js';
import { AuthService } from '../../auth/providers/auth.service.js';
import { User } from '../user.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto.js';

/**
 * The UsersService class is responsible for handling user-related operations in the application. It provides methods to retrieve all users, find a user by ID, and search for users based on a text query. The service also interacts with the AuthService to check authentication status when searching for users.
 */
@Injectable()
export class UsersService {

    /**
     * 
     * param authService 
     */
    constructor (
        @Inject(forwardRef(()=>AuthService))
        private readonly authService:AuthService,
        @InjectRepository(User)
        private readonly usersRepository:Repository<User>
    ){

    }

    public async createUser(createUserDto:CreateUserDto){
        const existUser=await this.usersRepository.findOne({where:{email:createUserDto.email}});

        let newUser=this.usersRepository.create(createUserDto);
        newUser=await this.usersRepository.save(newUser);
        return newUser;

    }
    /**
     * 
     * getAll method retrieves all users or a specific user by ID based on the provided parameters. It accepts a GetUsersParamDto object, a limit for pagination, and a page number. The method returns an array of user objects.
     */
    public getAll(getUsersParamDto :GetUsersParamDto,limit :number,page:number){
        
        return[
            {
                first_name:"anas",
                email:"anas@gmail.com"

            }
        ]
    }
    /**
     * findOneById method retrieves a specific user by ID based on the provided parameters. It accepts a GetUsersParamDto object, a limit for pagination, and a page number. The method returns an array containing the user object with the specified ID.
     * @param getUsersParamDto 
     * @param limit 
     * @param page 
     * @returns 
     */

    public findOneById(getUsersParamDto :GetUsersParamDto,limit :number,page:number){
        return[
            {
                first_name:"anas",
                email:"anas@gmail.com"

            }
        ]
    }
    /**
     * find method searches for users based on a text query. It accepts a string parameter txt and returns an array of user objects that match the search criteria. The method also checks the authentication status using the AuthService before performing the search.
     * @param txt 
     * @returns 
     */
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
