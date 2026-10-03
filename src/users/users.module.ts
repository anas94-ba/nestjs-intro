import { Module,forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './Providers/users.service.js';
import { AuthModule } from '../auth/auth.module.js';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[forwardRef(() => AuthModule)], //forwarerd ref to solve circuler dependancy
  exports:[UsersService],
  
})
export class UsersModule {}
