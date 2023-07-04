import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() username: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() fullname: string;
  @IsNotEmpty() dateOfBirth: string;
  @IsNotEmpty() gender: string;
}

export class LoginUserDto {
  @IsNotEmpty() username: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() email: string;
}
