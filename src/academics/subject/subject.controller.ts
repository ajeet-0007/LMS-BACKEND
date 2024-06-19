import { Body, Controller, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService){}
    @UseInterceptors(FileInterceptor('subject_image'))
    @Post('add-subject')
    
    async addSubject(@Body() body: any, @UploadedFile() subject_image: Express.Multer.File){
       try{
       const result = await this.subjectService.addSubject(body, subject_image.buffer.toString('base64'));
       if(result?.success && !result?.dataFound) return {message: "Record Inserted Successfully", result: {success: result?.success, subjectId : result?.subjectId}};
       else return { message: 'Record Already Exist', result };
       } catch(error){
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
}
