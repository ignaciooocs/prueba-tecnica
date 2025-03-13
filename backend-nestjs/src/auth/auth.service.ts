import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {

      const { email, password } = signUpDto;
      const user = await this.userService.findByEmail(email);

      if (user) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.userService.create({ email, password: hashedPassword });

      return { 
        ok: true, 
        message: 'User created successfully', 
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
      if (!user) throw new HttpException('credentials are not valid', HttpStatus.UNAUTHORIZED);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new HttpException('credentials are not valid', HttpStatus.UNAUTHORIZED);
    
      const token = await this.jwtService.signAsync({ id: user.id, email: user.email });

      return {
        ok: true,
        message: 'User logged in successfully',
        token,
        email
      }

    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}