import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  
  @IsEmail()
  email: string;


  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  isActive?: boolean;
}
