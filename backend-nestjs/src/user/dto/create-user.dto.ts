export class CreateUserDto {
    email: string;
    password: string;
    isEmailVerified?: boolean;
    verificationToken?: string;
    resetPasswordToken?: string;
    isPasswordTokenVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
