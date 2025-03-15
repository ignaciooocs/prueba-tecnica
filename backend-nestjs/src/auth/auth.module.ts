import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt-constant';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    EmailModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
