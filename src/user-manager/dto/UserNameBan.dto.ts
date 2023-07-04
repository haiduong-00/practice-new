import { IsNotEmpty } from 'class-validator';

export class UserNameBanDto {
  @IsNotEmpty() email: string;
}
