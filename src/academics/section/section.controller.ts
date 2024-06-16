import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Get,
  Req,
} from '@nestjs/common';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post('/add-section')
  async insertSectionData(@Body('section') section: string) {
    try {
      const result = await this.sectionService.addSection(section);
      if (result.success && !result.data_found) return {success: result.success};
      else return { message: 'Record Already Exist', result };
    } catch (error) {
      console.log(error);
      throw new HttpException( 
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Get('get-sections')
  async getSectionsData(){
    try {
        const section = await this.sectionService.getSectionData();
        return section;
    } catch (error) {
        console.log(error);
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error"
        }, HttpStatus.INTERNAL_SERVER_ERROR, {cause: error})
    }
  }
}
