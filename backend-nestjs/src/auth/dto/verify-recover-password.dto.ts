import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class VerifyRecoverPasswordDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
    
    @IsNotEmpty()
    @IsString()
    code: string
}