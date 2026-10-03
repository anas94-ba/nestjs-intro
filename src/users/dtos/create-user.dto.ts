import { IsEmail, IsNotEmpty, IsString ,isNotEmpty, MinLength, Matches,MaxLength} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(37)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(37)
  lastName? : string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(37)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{
    message:"8 letters at least , and capital and small letters"
  })
  password: string;
}