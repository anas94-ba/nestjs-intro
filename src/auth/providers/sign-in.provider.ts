import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from '../../users/Providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import * as config from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SignInProvider {
    constructor(
        @Inject(forwardRef(()=>UsersService))
        private readonly userService:UsersService,
        @Inject(HashingProvider)
        private readonly hashingProvider:HashingProvider,
        private readonly jwtService:JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfigeration:config.ConfigType<typeof jwtConfig>,
    ){}
    public async signIn(signInDto :SignInDto){
        let user=this.userService.findOneByEmail(signInDto.email);

        let isEqual:boolean=false;

        try{
            isEqual=await this.hashingProvider.comparePassword(signInDto.password,(await user).password);
            
        }catch(error){
            throw new RequestTimeoutException(error,{
                description:"coudn't compare password"
            });

        }

        if(!isEqual){
            throw new UnauthorizedException("Incorrect password");
        }
        const accessToken=await this.jwtService.signAsync(
            {
                sub:(await user).id,
                email:(await user).email
            },{
                audience:this.jwtConfigeration.audience,
                secret:this.jwtConfigeration.secret,
                issuer:this.jwtConfigeration.issuer,
                expiresIn:this.jwtConfigeration.accessTokenTtl
            }
        )
        return accessToken;

    }
}
