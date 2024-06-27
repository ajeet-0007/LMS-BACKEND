import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Delete,
  Param,
  Put
} from '@nestjs/common';
import { ClassService } from './class.service';
import { StreamService } from '../stream/stream.service';
import { SectionService } from '../section/section.service';

@Controller('class')
export class ClassController {
  constructor(
    private readonly classService: ClassService,
    private readonly streamService: StreamService,
    private readonly sectionService: SectionService,
  ) {}
  @Get('/get-section-and-stream')
  async getClassSectionAndStream() {
    try {
      const streams = await this.streamService.getStreamData();
      const sections = await this.sectionService.getSectionData();
      return { ...streams, ...sections };
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

  @Post('/add-class')
  async addClass(@Body() body: any) {
    try {
      const result = await this.classService.addClass(
        body.class_name,
        body.class_section,
        body.class_stream === null ? null : body.class_stream,
      );
      if (result.success && !result.dataFound)
        return {
          message: 'Record Inserted Successfully',
          result: { success: result.success, section_id: result.classId },
        };
      else return { message: 'Record Already Exist', result };
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

  @Get('get-classes')
  async getClassesData(){
    try {
        const classes = await this.classService.getClassesData();
        return classes;
    } catch (error) {
        console.log(error);
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error"
        }, HttpStatus.INTERNAL_SERVER_ERROR, {cause: error})
    }
  }

  @Delete('delete-class/:class_id')
  async deleteClass(@Param() params: any) {
    try {
      const result = await this.classService.deleteClass(params?.class_id);
      if (result.success && result.dataFound) return {message: "Record Deleted Successfully",result: {success: result.success}};
      else return { message: 'Record Does Not Exist', result };
    } catch (error) {
      console.log(error);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error"
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Put('update-class/:class_id')
  async updateClass(@Body() body: any, @Param() params: any){
    try {
      const result = await this.classService.updateClass(params?.class_id, body);
      if (result.success && result.dataFound)
        return {message: "Record Updated Successfully",result: {success: result.success},
        };
        else return { message: 'Record Does Not Exist', result };
    } catch (error) {
      console.log(error);
      throw new HttpException({
        status:  HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error"
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
