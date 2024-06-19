import { Module } from '@nestjs/common';
import { SectionController } from './section/section.controller';
import { SectionService } from './section/section.service';
import { StreamController } from './stream/stream.controller';
import { StreamService } from './stream/stream.service';

@Module({
  controllers: [SectionController, StreamController],
  providers: [SectionService, StreamService]
})
export class AcademicsModule {}
