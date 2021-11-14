import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from 'src/user/interfaces/user-interface.interface';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

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
    return this.generateJwt({
      id: user.id,
      emailAddress: user.emailAddress,
      username: user.username,
    });
  }

  generateJwt({ username, id, emailAddress }: JwtPayload) {
    const jwtPayload = {
      user: {
        username,
        id,
        emailAddress,
      },
    };
    return {
      access_token: this.jwtService.sign(jwtPayload),
      username,
      id,
      emailAddress,
    };
  }

  async validateOrCreateJwt(token: string) {
    try {
      return await this.validateJwt(token);
    } catch (e: any) {
      if (e.name !== 'TokenExpiredError') {
        throw e;
      }
      const tokenPayload = this.jwtService.decode(token) as {
        user: JwtPayload;
      };
      const jwtPayload = tokenPayload.user as JwtPayload;
      console.log(
        `jwt token expired, issuing a new one for user ${jwtPayload.username}..`,
      );
      return this.generateJwt(jwtPayload);
    }
  }
  async validateJwt(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
}
