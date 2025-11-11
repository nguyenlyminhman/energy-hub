import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserLoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { AppUtil } from 'src/utils/app.util';
import { users } from 'generated/prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ResponseDto } from 'src/common/payload.data';

@Injectable()
export class AuthService {
  constructor(
    readonly prisma: PrismaService,
    readonly userService: UsersService,
    readonly jwtService: JwtService,
  ) { }


  async login(loginData: UserLoginDto): Promise<ResponseDto> {
    const responseDto = new ResponseDto();
    try {

      const user = await this.userService.findByUsername(loginData.username);
      if (!user) {
        throw new Error('Invalid user');
      }

      const isPassword = AppUtil.comparePassword(loginData.password, user.password);
      if (!isPassword) {
        throw new Error('Invalid user');
      }

      const accessToken = await this.jwtService.signAsync(user);

      responseDto.data = {
        accessToken,
        user: user
      }

      return responseDto;
    } catch (error) {
      throw error;
    }
  };

}
