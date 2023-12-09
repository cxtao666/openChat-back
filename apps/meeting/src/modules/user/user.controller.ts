import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { generatePhoto } from '@app/common/index';
import { UserService } from './user.service';
import { ResPack } from '@app/common/index';
import { AuthService } from '@app/common/index';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';

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

class LoginDto {
  @ApiProperty({ name: 'username' })
  username: string; //手机号码
  @ApiProperty({ name: 'password' })
  password: string; // 密码
  @ApiProperty({ name: 'nickname' })
  nickname: string; // 昵称
  @ApiProperty({ name: 'avatar' })
  avatar: string; // 头像
  @ApiProperty({ name: 'id' })
  id: string; // id
}

class LoginVo {
  @ApiProperty({ name: 'message' })
  message: string;
  @ApiProperty({ name: 'status' })
  status: string;
}

@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '登录', description: '用户登录' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '登录成功',
    type: LoginVo,
  })
  @ApiBody({
    type: LoginDto,
  })
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
      const jwtInfo = await this.authService.certificate(user);
      return new ResPack({
        message: user,
        token: jwtInfo.data?.token,
      }).success();
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
