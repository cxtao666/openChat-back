import { Module } from '@nestjs/common';
import { CustomLogger } from './log.service';

@Module({ providers: [CustomLogger] })
export class CustomLogModule {}
