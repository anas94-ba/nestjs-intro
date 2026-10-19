import { Module,forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './providers/auth.service.js';
import { UsersModule } from '../users/users.module.js';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider.js';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config.js';
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: HashingProvider, useClass: BcryptProvider },
    SignInProvider,
  ],
  imports:[forwardRef(() => UsersModule),ConfigModule.forFeature(jwtConfig),JwtModule.registerAsync(jwtConfig.asProvider())],
  exports:[AuthService,HashingProvider],

  
})
export class AuthModule {}
