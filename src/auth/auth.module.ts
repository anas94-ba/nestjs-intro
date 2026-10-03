import { Module,forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './providers/auth.service.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[forwardRef(() => UsersModule)],
  exports:[AuthService],

  
})
export class AuthModule {}
