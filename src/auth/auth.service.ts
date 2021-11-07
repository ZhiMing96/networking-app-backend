import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from 'src/user/interfaces/user-interface.interface';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const userWPassword = await this.userService.findOneForLogin(username);
    if (!userWPassword) return null;
    const { passwordHash, ...result } = userWPassword;
    const isMatch = await bcrypt.compare(password, passwordHash);
    if (!isMatch) return null;
    return result;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.validateUser(username, password);
    return this.generateJwt(user);
  }

  generateJwt(user: UserInterface) {
    const jwtPayload = {
      user: {
        username: user.username,
        id: user.id,
        email: user.emailAddress,
      },
    };
    return {
      access_token: this.jwtService.sign(jwtPayload),
    };
  }
}
