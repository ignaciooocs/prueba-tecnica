import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
