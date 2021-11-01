import { Controller, Post, Body } from '@nestjs/common';
import { generatePhoto } from '../../common/generatePhoto';
import { UserService } from './user.service';
import { ResPack } from '../../common/resPack';

interface loginBody {
  username: string;
  password: string;
}

interface registerBody {
  username: string; //手机号码
  password: string; // 密码
  nickname: string; // 昵称
  avatar: string; // 头像
  id: string; // id
}

interface resBody {
  message: string;
  status: string;
}

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() data: loginBody): Promise<resBody> {
    if (
      data == undefined ||
      data.username == undefined ||
      data.password == undefined
    ) {
      return new ResPack('用户名或密码为输入为空').error();
    }
    const user = await this.userService.findOne(data);
    if (user == null) {
      return new ResPack('用户名不存在').error();
    } else {
      if (user.password !== data.password) {
        return new ResPack('密码错误').error();
      }
      return new ResPack(user).success();
    }
  }

  @Post('register')
  async register(@Body() data: registerBody): Promise<resBody> {
    const user = await this.userService.findOne(data);
    if (user != null) {
      // 用户已被注册
      return new ResPack('该用户已被注册').error();
    }
    data.avatar = generatePhoto();
    await this.userService.addOne(data);
    return new ResPack('用户注册成功').success();
  }
}
