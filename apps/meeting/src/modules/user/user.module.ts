import { Module } from '@nestjs/common';
import { AuthModule } from '@app/common/index';
import { DatabaseModule } from '@app/common/index';
import { UserController } from './user.controller';
import { UserProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserController],
  providers: [...UserProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
