import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ClassService } from './class.service';
import { StreamService } from '../stream/stream.service';
import { SectionService } from '../section/section.service';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService, private readonly streamService: StreamService, private readonly sectionService: SectionService) {}
  @Get('/get-section-and-stream')
  async getClassSectionAndStream() {
    try {
        const streams = await this.streamService.getStreamData();
        const sections = await this.sectionService.getSectionData();
        return {...streams, ...sections}
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
}
