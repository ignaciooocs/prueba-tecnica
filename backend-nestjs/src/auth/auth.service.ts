import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import { RecoverPasswordDto } from './dto/recover-pasword.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { VerifyRecoverPasswordDto } from './dto/verify-recover-password.dto';
import { IPromiseResponse } from './types/auth.t';
import { RetryEmailDto } from './dto/retry-email.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<IPromiseResponse> {
    try {

      const { email, password } = signUpDto;
      const user = await this.userService.findByEmail(email);

      if (user) {
        throw new HttpException('El correo ya esta registrado', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await this.userService.hashPassword(password);
      const createdUser = await this.userService.create({ email, password: hashedPassword });

      if (!createdUser) throw new HttpException('User not created', HttpStatus.BAD_REQUEST);

      const subject = 'Verificación de correo';
      await this.handleEmail({ id: createdUser.id, email: createdUser.email, subject });

      return { 
        ok: true, 
        message: 'Registro exitoso, se ha enviado un correo con un codigo de verificación', 
        email 
      };
      
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async signIn(signInDto: SignInDto): Promise<IPromiseResponse> {
    try {
      const { email, password } = signInDto;

      const user = await this.userService.findByEmail(email);
      if (!user) throw new HttpException('El correo o la contraseña no son validos', HttpStatus.UNAUTHORIZED);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new HttpException('El correo o la contraseña no son validos', HttpStatus.UNAUTHORIZED);
    
      if (!user.isEmailVerified) {
        const subject = 'Verificación de correo';
        await this.handleEmail({ id: user.id, email: user.email, subject });
        throw new HttpException('Debe verificar su correo', HttpStatus.UNAUTHORIZED);
      }

      const token = await this.jwtService.signAsync({ id: user.id, email: user.email });

      return {
        message: 'Sesion iniciada exitosamente',
        ok: true,
        token,
        email
      }

    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  async verifyEmail({ email, code }: VerifyEmailDto): Promise<IPromiseResponse> {
    try {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new HttpException('No se encontró el email', HttpStatus.NOT_FOUND);

        if (user.verificationToken !== code) throw new HttpException('Código de verificación no valido', HttpStatus.BAD_REQUEST);

        await this.userService.update(user.id, { verificationToken: '', isEmailVerified: true });

        return { message: 'Correo verificado exitosamente', ok: true, email: user.email}
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto) {
    try {
      const user = await this.userService.findByEmail(recoverPasswordDto.email);
      if (!user) throw new HttpException('El correo no es valido', HttpStatus.NOT_FOUND);

      const subject = 'Recuperación de contraseña';
      await this.handleEmail({ id: user.id, email: user.email, subject });

      return { ok: true, message: 'Se ha enviado un correo con un codigo de verificación', email: recoverPasswordDto.email };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyRecoverPassword(verifyRecoverPasswordDto: VerifyRecoverPasswordDto): Promise<IPromiseResponse> {
    try {
      const user = await this.userService.findByCodePassword(verifyRecoverPasswordDto.code, verifyRecoverPasswordDto.email);
      if (!user) throw new HttpException('El codigo de verificacion no es valido', HttpStatus.NOT_FOUND);

      await this.userService.update(user.id, { resetPasswordToken: '', isPasswordTokenVerified: true });

      return { message: 'Codigo verificado exitosamente', ok: true, email: user.email }

    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<IPromiseResponse> {
    const { email, password } = updatePasswordDto;
    try {
      const user = await this.userService.findByEmail(email);
      if (!user?.isPasswordTokenVerified) throw new HttpException('Debe verificar su correo', HttpStatus.UNAUTHORIZED);

      const hashedPassword = await this.userService.hashPassword(password);

      await this.userService.updatePassword(email, hashedPassword);
      await this.userService.update(user.id, { isPasswordTokenVerified: false });

      return { message: 'Contraseña actualizada exitosamente', ok: true }

    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async retryCodeEmail({ email, subject }: RetryEmailDto): Promise<IPromiseResponse> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) throw new HttpException('El correo no es valido', HttpStatus.NOT_FOUND);

      await this.handleEmail({ id: user.id, email, subject });

      return { ok: true, message: 'Se ha enviado un correo con un codigo de verificación', email };
    }
      catch (error) {
        if (error instanceof HttpException) throw error;
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
  }
    

  async handleEmail({id, email, subject}: {id: number, email: string, subject: string}): Promise<void> {
      const code = Math.floor(100000 + Math.random() * 900000);
        if (subject.includes('correo')) {
          await this.userService.update(id, { verificationToken: code.toString() });
          await this.emailService.sendEmail(email, subject, code);
          return 
        }

        await this.userService.update(id, { resetPasswordToken: code.toString() });
        await this.emailService.sendEmail(email, subject, code);
  }
}

