import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingProvider } from '../../auth/providers/hashing.provider';
import { AuthModule } from '../../auth/auth.module';

@Injectable()
export class CreateUserProvider {

     constructor (
            @InjectRepository(User)
            private readonly usersRepository:Repository<User>,
            @Inject(forwardRef(() => HashingProvider))
            private readonly hashingProvider:HashingProvider

        ){
    
        }

    public async createUser(createUserDto:CreateUserDto){
        let existingUser = undefined;

        try{
            existingUser=await this.usersRepository.findOne({where:{email:createUserDto.email}});
        }catch(error){
            throw new RequestTimeoutException(
                "Unable to connect to database ,please try in another time",
                {
                    description:"unable to connect to db"
                }
            )
        }
        if(existingUser){
            throw new BadRequestException(
                "User already exist please,check your email"
            );
        }
        let newUser=this.usersRepository.create({
            ...createUserDto,
            password:await this.hashingProvider.hashPassword(createUserDto.password)
        });
        try{
            newUser=await this.usersRepository.save(newUser);

        }catch(error){
            throw new RequestTimeoutException(
                "Unable to connect to database ,please try in another time",
                    {
                    description:"unable to connect to db"
                }
            )
        }
        
        return newUser;

    }
}
