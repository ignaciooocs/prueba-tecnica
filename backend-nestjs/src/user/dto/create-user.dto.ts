import { IsEmail, IsNotEmpty, IsString, Length} from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(6)
    password: string;
}
