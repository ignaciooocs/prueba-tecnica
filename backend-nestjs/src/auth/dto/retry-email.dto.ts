import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RetryEmailDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    subject: string
}