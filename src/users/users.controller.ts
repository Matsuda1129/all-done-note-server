import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, EditUserDto } from './users.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService, private jwtService: JwtService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });
    delete user.password;

    return user;
  }

  @Post('login')
  async login(
    @Req() req: Request,
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (await bcrypt.compare(password, user.password)) {
      throw new BadRequestException('invalid credentials');
    }
    const cookie = req.cookies['jwt'];
    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });
    response.cookie('signedIn', 'true');
    return cookie;
  }

  @Get('cookie')
  async cookie(@Req() req: Request) {
    try {
      const cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.userService.findOne({ id: data['id'] });
      console.log(user);

      const { password, ...result } = user;
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUserList() {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findOneId(Number(id));
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: EditUserDto) {
    return this.userService.update(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    const result = this.userService.deleteOne(id);
    return {
      message: 'success deleted',
      result,
    };
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    response.clearCookie('signedIn');

    return {
      message: 'success',
    };
  }
}
