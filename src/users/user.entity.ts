import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './user-role.anum';
import { IsOptional } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @IsOptional()
  @Column ({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;
  
  @Column({ nullable: true })
  profile: string;
  
  
}