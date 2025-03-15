import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { RecoverPasswordDto } from './dto/recover-pasword.dto';
import { VerifyRecoverPasswordDto } from './dto/verify-recover-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {

      const { email, password } = signUpDto;
      const user = await this.userService.findByEmail(email);

      if (user) {
        throw new HttpException('El correo ya esta registrado', HttpStatus.BAD_REQUEST);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createdUser = await this.userService.create({ email, password: hashedPassword });

      if (!createdUser) throw new HttpException('User not created', HttpStatus.BAD_REQUEST);

      const code = Math.floor(100000 + Math.random() * 900000);
      const subject = 'Verificacion de correo';

      await this.userService.update(createdUser.id, { verificationToken: code.toString() });

      await this.emailService.sendEmail(email, subject, code);

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

  async signIn(signInDto: SignInDto) {
    try {
      const { email, password } = signInDto;

      const user = await this.userService.findByEmail(email);
      if (!user) throw new HttpException('El correo o la contraseña no son validos', HttpStatus.UNAUTHORIZED);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new HttpException('El correo o la contraseña no son validos', HttpStatus.UNAUTHORIZED);
    
      if (!user.isEmailVerified) throw new HttpException('Debe verificar su correo', HttpStatus.UNAUTHORIZED);

      const token = await this.jwtService.signAsync({ id: user.id, email: user.email });

      return {
        ok: true,
        message: 'Sesion iniciada exitosamente',
        token,
        email
      }

    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  async verifyEmail(code: string) {
    try {
      const user = await this.userService.findByVerificationToken(code);
      if (!user) throw new HttpException('El codigo de verificacion no es valido', HttpStatus.NOT_FOUND);

      await this.userService.update(user.id, { verificationToken: '', isEmailVerified: true });

      return {
        ok: true,
        message: 'Correo verificado exitosamente',
        email: user.email
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto) {
    try {
      const user = await this.userService.findByEmail(recoverPasswordDto.email);
      if (!user) throw new HttpException('El correo no es valido', HttpStatus.NOT_FOUND);

      const code = Math.floor(100000 + Math.random() * 900000);
      const subject = 'Recuperacion de contraseña';

      await this.userService.update(user.id, { resetPasswordToken: code.toString() });

      await this.emailService.sendEmail(recoverPasswordDto.email, subject, code);

      return { 
        ok: true, 
        message: 'Se ha enviado un correo con un codigo de verificación', 
        email: recoverPasswordDto.email 
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyRecoverPassword(verifyRecoverPasswordDto: VerifyRecoverPasswordDto) {
    try {
      const user = await this.userService.findByCodePassword(verifyRecoverPasswordDto.code, verifyRecoverPasswordDto.email);
      if (!user) throw new HttpException('El codigo de verificacion no es valido', HttpStatus.NOT_FOUND);

      await this.userService.update(user.id, { resetPasswordToken: '', isPasswordTokenVerified: true });

      return {
        ok: true,
        message: 'Codigo verificado exitosamente',
        email: user.email
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const { email, password } = updatePasswordDto;
    try {
      const user = await this.userService.findByEmail(email);
      if (!user?.isPasswordTokenVerified) throw new HttpException('Debe verificar su correo', HttpStatus.UNAUTHORIZED);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.userService.updatePassword(email, hashedPassword);

      await this.userService.update(user.id, { isPasswordTokenVerified: false });

      return {
        ok: true,
        message: 'Contraseña actualizada exitosamente',
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}

