import { Module } from '@nestjs/common';
import { SectionController } from './section/section.controller';
import { SectionService } from './section/section.service';

@Module({
  controllers: [SectionController],
  providers: [SectionService]
})
export class AcademicsModule {}
