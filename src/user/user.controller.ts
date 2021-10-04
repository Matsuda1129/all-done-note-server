import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, EditUserDto } from './user.dto';

@Controller('user')
export class UserController {
  // サービスの呼び出し
  constructor(private readonly userService: UserService) {}

  // `User`のURIへのGETメソッドでデータ全件取得．サービスの`findAll()`関数を実行．
  @Get()
  async getUserList() {
    const data = await this.userService.findAll();
    return {
      data,
    };
  }

  // `User`のURIへのPOSTメソッドでデータ新規登録．
  @Post()
  async addUser(@Body() User: CreateUserDTO) {
    return await this.userService.createOne(User);
  }

  // `User/id番号`のURIへのGETメソッドでid指定で1件データ取得．
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: EditUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    const result = this.userService.deleteOne(id);
    return {
      message: 'success deleted',
      result
    }
  }
}
