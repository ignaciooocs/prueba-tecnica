import { Controller, Post, Patch, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RecoverPasswordDto } from './dto/recover-pasword.dto';
import { VerifyRecoverPasswordDto } from './dto/verify-recover-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { IPromiseResponse } from './types/auth.t';
import { RetryEmailDto } from './dto/retry-email.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<IPromiseResponse> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto): Promise<IPromiseResponse> {
    return this.authService.signIn(signInDto);
  }

  @Post('verify-email')
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto): Promise<IPromiseResponse> {
    return this.authService.verifyEmail(verifyEmailDto);
  }

  @Post('recover-password')
  recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto): Promise<IPromiseResponse> {
    return this.authService.recoverPassword(recoverPasswordDto);
  }

  @Post('verify-recover-password')
  verifyRecoverPassword(@Body() verifyRecoverPasswordDto: VerifyRecoverPasswordDto): Promise<IPromiseResponse> {
    return this.authService.verifyRecoverPassword(verifyRecoverPasswordDto);
  }

  @Post('retry-code-email')
  retryCodeEmail(@Body() RetryEmailDto: RetryEmailDto): Promise<IPromiseResponse> {
    return this.authService.retryCodeEmail(RetryEmailDto);
  }

  @Patch('update-password')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto): Promise<IPromiseResponse> {
    return this.authService.updatePassword(updatePasswordDto);
  }
}
