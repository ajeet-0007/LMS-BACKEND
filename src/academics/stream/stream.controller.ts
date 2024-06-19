import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
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
}
