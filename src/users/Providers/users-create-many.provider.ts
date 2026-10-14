import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { RuntimeException } from '@nestjs/core/internal';

@Injectable()
export class UsersCreateManyProvider {
    constructor (
            private readonly dataSource:DataSource,
    ){

    }
    public async createMany(createUsersDto :CreateUserDto[]){
        let newUsers:User[] = [];
        const queryRunner=this.dataSource.createQueryRunner();
        try{
            await queryRunner.connect();
            await queryRunner.startTransaction();
        }catch(error){
            throw new RuntimeException("Try in another time");
        }
        

        try{
            for(let user of createUsersDto){
                let newUser = queryRunner.manager.create(User,user);
                let result=await queryRunner.manager.save(newUser);
                newUsers.push(result);
            }
            await queryRunner.commitTransaction();
        }catch(error){
            await queryRunner.rollbackTransaction();
            throw new ConflictException("Couldn't create transaction",{
                description: String(error)
            });

        }finally{
            try{
                await queryRunner.release();

            }catch(error){
              throw new RequestTimeoutException("Couldn't release",
                {
                 description: String(error)
                }
              );
            }
            
        }
        return newUsers;


    }
}
