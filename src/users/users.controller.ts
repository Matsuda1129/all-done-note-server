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
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { EditUserDto, CreateUserDto } from './users.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('token')
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body(ValidationPipe) dto: CreateUserDto,
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      return await this.usersService.createOne({
        name: name,
        email: email,
        alive: true,
        password: hashedPassword,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = await this.usersService.findOne({ email });
      if (!user) {
        throw new BadRequestException('invalid credentials');
      }

      const compared = await bcrypt.compareSync(password, user.password);
      if (!compared) {
        throw new BadRequestException('invalid credentials');
      }
      const jwt = await this.jwtService.signAsync({ id: user.id });
      res.json({ jwt: jwt });
    } catch (error) {
      console.log(error);
    }
  }

  @Get('cookie')
  async cookie(@Req() req: Request) {
    try {
      const cookie = await req.headers.authorization.split('Bearer ')[1];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.usersService.findOne({ id: data['id'] });
      const { password, ...result } = user;
      return result;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }

  // @UseGuards(AuthGuard)
  @Get()
  async findAllUser() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':name')
  async findUserByName(@Param('name') name: string) {
    return await this.usersService.findOne({ name });
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body(ValidationPipe) dto: EditUserDto) {
    return this.usersService.update(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    const result = this.usersService.deleteOne(id);
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
