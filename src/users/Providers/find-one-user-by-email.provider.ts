import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from '../../auth/providers/hashing.provider';
import { error } from 'console';

@Injectable()
export class FindOneUserByEmailProvider {
    constructor (
        @InjectRepository(User)
        private readonly usersRepository:Repository<User>,
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider:HashingProvider

    ){

    }

    public async findOneUserByEmail(email:string){
        let user:User | null = null;
        try{
            user=await this.usersRepository.findOneBy({
                email:email
            });
        }catch(error){
            throw new RequestTimeoutException(error,{
                description:"couldn't featch the user"
            })
        }
        if(!user){
            throw new UnauthorizedException("User isn't exist")

        }
        return user;
    }

}
