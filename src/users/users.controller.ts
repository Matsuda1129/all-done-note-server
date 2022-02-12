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
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { EditUserDto, CreateUserDto, EditUserPicture, EditUserTodo } from './users.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/database/entities/users.entity';

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
  @Put('/:id/todo')
  async updateTodo(@Param('id') id: number, @Body() dto: EditUserTodo) {
    return this.usersService.updateTodo(id, dto);
  }

  @UseGuards(AuthGuard)
  @Put('/:id/picture')
  async updatePicture(@Param('id') id: number, @Body() dto: EditUserPicture) {
    return this.usersService.updatePicture(id, dto);
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

  @UseGuards(AuthGuard)
  @Post('/page')
  async index2(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Body('searchWord') searchWord: string,
    @Body('gender') gender: string,
    @Body('age') age: number,
    @Body('job') job: number,
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;

    let selectAge: any = [];
    if (age === undefined) {
      for (let i = 0; selectAge.length < 150; i++) {
        selectAge.push(i);
      }
    } else {
      for (let i = age; selectAge.length < 10; i++) {
        selectAge.push(i);
      }
    }

    let selectGender;
    if (gender === undefined) {
      selectGender = ['man', 'woman', 'other'];
    } else {
      selectGender = [gender];
    }

    let selectJob;

    if (job === undefined) {
      selectJob = [
        '農林業・水産業・鉱業',
        '建設・土木・工業',
        '電子部品・デバイス・電子回路製造業',
        '情報通信機械器具製造業',
        'その他製造業',
        '電気・ガス・熱供給・水道業',
        '通信業',
        '情報サービス業',
        'その他の情報通信業',
        '運輸業・郵便業',
        '卸売業・小売業',
        '金融業・保険業',
        '不動産業・物品賃貸業',
        '学術研究・専門技術者',
        '宿泊業・飲食サービス業',
        '生活関連サービス業・娯楽業',
        '教育・学習支援業',
        '医療・福祉業',
        '複合サービス業',
        'その他サービス業',
      ];
    } else {
      selectJob = [job];
    }

    const result = this.usersService.paginateSearched(
      {
        page,
        limit,
      },
      searchWord,
      selectGender,
      selectAge,
      selectJob,
    );
    return result;
  }
}
