import { Module } from '@nestjs/common';
import { DatabaseModule } from '../databse/database.module';
import { GroupModule } from '../group/group.module';
import { RoomController } from './room.controller';
import { RoomProviders } from './room.providers';
import { RoomService } from './room.service';

@Module({
  imports: [DatabaseModule, GroupModule],
  controllers: [RoomController],
  providers: [...RoomProviders, RoomService],
  exports: [RoomService],
})
export class RoomModule {}
