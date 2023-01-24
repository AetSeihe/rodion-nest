import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/users/dto/out/user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { GetJwtToken } from './dto/out/get-jwt-token';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserEntity> {
    const user = await this.usersService.findOneByLogin(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: UserEntity): Promise<GetJwtToken> {
    const payload = { username: user.name, sub: user.id };
    return {
      user: new UserDTO(user.get()),
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
