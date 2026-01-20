import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../user-role.anum';

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

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
