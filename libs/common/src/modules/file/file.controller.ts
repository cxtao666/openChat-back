import { Controller, Get } from '@nestjs/common';
import { FileService } from './file.service';
import { QiNiuConfig } from '../../config/qiniu';
import * as qiniu from 'qiniu';
import { ResPack } from '../../common/resPack';

interface resBody {
  message: string;
  status: string;
}

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('api/getUpLoadToken')
  async getUpLoadToken(): Promise<resBody> {
    const mac = new qiniu.auth.digest.Mac(
      QiNiuConfig.accessKey,
      QiNiuConfig.secretKey,
    );
    const options = {
      scope: QiNiuConfig.bucket,
      expires: 3600 * 2, //token过期时间2小时
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);

    if (uploadToken) {
      return new ResPack(uploadToken).success();
    } else {
      return new ResPack('token获取失败').error();
    }
  }
}
