import { Controller, Post, Patch, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RecoverPasswordDto } from './dto/recover-pasword.dto';
import { VerifyRecoverPasswordDto } from './dto/verify-recover-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { IPromiseResponse } from './types/auth.t';
import { RetryEmailDto } from './dto/retry-email.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiTags,  } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({ description: 'Registro exitoso, se ha enviado un correo con un codigo de verificación' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: SignUpDto, description: "Registro de usuario" })
  signUp(@Body() signUpDto: SignUpDto): Promise<IPromiseResponse> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @ApiCreatedResponse({ description: 'Sesion iniciada exitosamente' })
  @ApiBody({ type: SignUpDto, description: "Ingreso de usuario" })
  signIn(@Body() signInDto: SignInDto): Promise<IPromiseResponse> {
    return this.authService.signIn(signInDto);
  }

  @Post('verify-email')
  @ApiCreatedResponse({ description: 'Correo verificado exitosamente' })
  @ApiBody({ type: VerifyEmailDto, description: "Verificación de correo con el código" })
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto): Promise<IPromiseResponse> {
    return this.authService.verifyEmail(verifyEmailDto);
  }

  @Post('recover-password')
  @ApiCreatedResponse({ description: 'Se ha enviado un correo con un codigo de verificación' })
  @ApiBody({ type: RecoverPasswordDto, description: "Recuperación de contraseña" })
  recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto): Promise<IPromiseResponse> {
    return this.authService.recoverPassword(recoverPasswordDto);
  }

  @Post('verify-recover-password')
  @ApiCreatedResponse({ description: 'código para recuperación de contraseña verificado' })
  @ApiBody({ type: VerifyRecoverPasswordDto, description: "Verificación de correo para recuperación de contraseña" })
  verifyRecoverPassword(@Body() verifyRecoverPasswordDto: VerifyRecoverPasswordDto): Promise<IPromiseResponse> {
    return this.authService.verifyRecoverPassword(verifyRecoverPasswordDto);
  }

  @Post('retry-code-email')
  @ApiCreatedResponse({ description: 'Se ha enviado un correo con un codigo de verificación' })
  @ApiBody({ type: RetryEmailDto, description: "Reenviar codigo de verificación" })
  retryCodeEmail(@Body() RetryEmailDto: RetryEmailDto): Promise<IPromiseResponse> {
    return this.authService.retryCodeEmail(RetryEmailDto);
  }

  @Patch('update-password')
  @ApiCreatedResponse({ description: 'Contraseña actualizada exitosamente' })
  @ApiBody({ type: UpdatePasswordDto, description: "Actualización de contraseña" })
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto): Promise<IPromiseResponse> {
    return this.authService.updatePassword(updatePasswordDto);
  }
}
