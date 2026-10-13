import { Module,forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './Providers/users.service.js';
import { AuthModule } from '../auth/auth.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity.js';
import { ConfigModule } from '@nestjs/config';
import profileConfig from './config/profile.config.js';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(profileConfig),
    TypeOrmModule.forFeature([User]),
  ], //forwarerd ref to solve circular dependency
  exports: [UsersService],
})
export class UsersModule {}
