export class CreateUserDto {
    email: string;
    password: string;
    isEmailVerified?: boolean;
    verificationToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
