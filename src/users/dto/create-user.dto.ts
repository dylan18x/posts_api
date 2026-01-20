import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../user-role.anum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  
  @IsEmail()
  email: string;


  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
