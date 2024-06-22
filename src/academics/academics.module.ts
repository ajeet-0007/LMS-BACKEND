import { Module } from '@nestjs/common';
import { SectionController } from './section/section.controller';
import { SectionService } from './section/section.service';
import { StreamController } from './stream/stream.controller';
import { StreamService } from './stream/stream.service';
import { SubjectController } from './subject/subject.controller';
import { SubjectService } from './subject/subject.service';
import { ClassController } from './class/class.controller';
import { ClassService } from './class/class.service';

@Module({
  controllers: [SectionController, StreamController, SubjectController, ClassController],
  providers: [SectionService, StreamService, SubjectService, ClassService]
})
export class AcademicsModule {}
