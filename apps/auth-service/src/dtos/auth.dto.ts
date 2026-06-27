import { IsEmail, IsString, MinLength, IsOptional, IsEnum, MaxLength } from 'class-validator';
import { Role } from '../generated/client';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email address format' })
  email: string;

  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(30, { message: 'Username cannot exceed 30 characters' })
  username: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Invalid role assignment parameters' })
  role?: Role;
}

export class LoginDto {
  @IsString()
  usernameOrEmail: string;

  @IsString()
  password: string;
}

export class WalletLoginDto {
  @IsString()
  address: string;

  @IsString()
  signature: string;

  @IsString()
  nonce: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}

export class CreateApiKeyDto {
  @IsString()
  @MinLength(3, { message: 'API key descriptor name is too short' })
  name: string;

  @IsOptional()
  @IsString()
  expiresAt?: string;
}
