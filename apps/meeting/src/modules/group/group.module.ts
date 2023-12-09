import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common/index';
import { GroupController } from './group.controller';
import { GroupProviders } from './group.providers';
import { GroupService } from './group.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupController],
  providers: [...GroupProviders, GroupService],
  exports: [GroupService],
})
export class GroupModule {}
