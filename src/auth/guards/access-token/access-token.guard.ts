import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as config from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import jwtConfig from '../../config/jwt.config';
import {Request} from 'express'
import { promises } from 'dns';
import { REQUEST_USER_KEY } from '../../constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService : JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfigration:config.ConfigType<typeof jwtConfig>

  ){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request=context.switchToHttp().getRequest();
    const token=this.extractRequestFromHeader(request);
    if(!token){
      throw new UnauthorizedException();
    }
    await this.jwtService.verifyAsync(token);
    try{
      const payload=await this.jwtService.verifyAsync(
        token,
        this.jwtConfigration
      );
      request[REQUEST_USER_KEY]=payload;


    }catch(error){
      throw new UnauthorizedException();

    }
    return true;
  }

  private extractRequestFromHeader(request:Request): string|undefined{
    const [_,token] = request.headers.authorization?.split(" ")??[];
    return token;

  }
}
