import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/decorators/public.decorator';
import { LoginDto } from './auth/dto/login.dto';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('token')
  async checkValidToken(@Req() request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.authService.validateOrCreateJwt(token);
  }

  @Public()
  @Post('app/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Public()
  @Post('app/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    const { access_token } = this.authService.generateJwt({
      username: newUser.username,
      id: newUser.id,
      emailAddress: newUser.emailAddress,
    });
    return { ...newUser, access_token };
  }
}
