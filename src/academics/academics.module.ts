import { Module } from '@nestjs/common';
import { SectionController } from './section/section.controller';
import { SectionService } from './section/section.service';
import { StreamController } from './stream/stream.controller';
import { StreamService } from './stream/stream.service';
import { SubjectController } from './subject/subject.controller';
import { SubjectService } from './subject/subject.service';

@Module({
  controllers: [SectionController, StreamController, SubjectController],
  providers: [SectionService, StreamService, SubjectService]
})
export class AcademicsModule {}
