import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() fullname: string;
  @IsNotEmpty() dateOfBirth: string;
  @IsNotEmpty() gender: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class LoginUserDto {
  // @IsNotEmpty() username: string;
  @IsString() password: string;
  @IsString() email: string;
}
