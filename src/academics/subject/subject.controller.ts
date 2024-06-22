import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}
  @UseInterceptors(FileInterceptor('subject_image'))
  @Post('add-subject')
  async addSubject(
    @Body() body: any,
    @UploadedFile() subject_image: Express.Multer.File,
  ) {
    try {
      const result = await this.subjectService.addSubject(
        body,
        subject_image.buffer.toString('base64'),
      );
      if (result?.success && !result?.dataFound)
        return {
          message: 'Record Inserted Successfully',
          result: { success: result?.success, subjectId: result?.subjectId },
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
        {
          cause: error,
        },
      );
    }
  }

  @Get('get-subjects')
  async getSubjects(){
    try {
        const subjects = await this.subjectService.getSubjects();
        return subjects;
    } catch (error) {
        console.log(error);
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error"
        }, HttpStatus.INTERNAL_SERVER_ERROR, {cause: error})
    }
  }

  @Delete('delete-subject/:subject_id')
  async deleteSubjects(@Param() params: any){
    try {
      const result = await this.subjectService.deleteSubject(params?.subject_id);
      if (result.success && result.dataFound) return {message: "Record Deleted Successfully",result: {success: result.success}};
      else return { message: 'Record Does Not Exist', result };
    } catch (error) {
      console.log(error);
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error"
        }, HttpStatus.INTERNAL_SERVER_ERROR, {cause: error})
    }
  }
}
