import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Get,
  Delete,
  Req,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post('/add-section')
  async insertSectionData(@Body('section') section: string) {
    try {
      const result = await this.sectionService.addSection(section);
      if (result.success && !result.data_found) return {message: "Record Inserted Successfully",result: {success: result.success}};
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

  @Put('update-section')
  async updateSection(@Query() query: any){
    try {
      const result = await this.sectionService.updateSection(query?.section_id, query?.section_name);
      if (result.success && result.dataFound && !result?.sectionExist) return {message: "Record Updated Successfully",result: {success: result.success}};
      else if(result?.sectionExist) return {message: "Record Already Exist", result: {success: result.success}}
      else return { message: 'Record Does Not Exist', result };
    } catch (error) {
      console.log(error);
      throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Internal Server Error"
      }, HttpStatus.INTERNAL_SERVER_ERROR, {cause: error})
    }
  }

  @Delete('delete-section/:section_id')
  async deleteSection(@Param() params: any){
    try {
      
      const result = await this.sectionService.deleteSection(params?.section_id);
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
