import { Module } from '@nestjs/common';
import { LiveController } from './live.controller';
import { LiveService } from './live.service';

@Module({
  imports: [],
  controllers: [LiveController],
  providers: [LiveService],
})
export class LiveModule {}
