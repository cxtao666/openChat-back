import { Module } from '@nestjs/common';
import { CustomLogger } from './log.service';

@Module({ providers: [CustomLogger], exports: [CustomLogger] })
export class CustomLogModule {}
