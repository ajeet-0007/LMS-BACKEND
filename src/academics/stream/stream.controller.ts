import { Controller, Post, Body, HttpException, HttpStatus, Get, Delete, Param , Put, Query} from '@nestjs/common';
import { StreamService } from './stream.service';

@Controller('stream')
export class StreamController {

    constructor(private readonly streamService : StreamService){}

@Post('/add-stream')
  async insertSectionData(@Body('stream') stream: string) {
    try {
      const result = await this.streamService.addStream(stream);
      if (result.success && !result.dataFound) return {message: "Record Inserted Successfully",result: {success: result?.success, streamId: result?.streamId}};
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

  @Get('get-stream')
  async getSectionsData(){
    try {
        const streams = await this.streamService.getStreamData();
        return streams;
    } catch (error) {
        console.log(error);
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error"
        }, HttpStatus.INTERNAL_SERVER_ERROR, {cause: error})
    }
  }

  @Put('update-stream')
  async updateSection(@Query() query: any){
    try {
      const result = await this.streamService.updateSection(query?.stream_id, query?.stream_name);
      if (result.success && result.dataFound && !result?.streamExist) return {message: "Record Updated Successfully",result: {success: result.success}};
      else if(result?.streamExist) return {message: "Record Already Exist", result: {success: result.success}}
      else return { message: 'Record Does Not Exist', result };
    } catch (error) {
      console.log(error);
      throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Internal Server Error"
      }, HttpStatus.INTERNAL_SERVER_ERROR, {cause: error})
    }
  }


  @Delete('delete-stream/:stream_id')
  async deleteSection(@Param() params: any){
    try {
      
      const result = await this.streamService.deleteStream(params?.stream_id);
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
