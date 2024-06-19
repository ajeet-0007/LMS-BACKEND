import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, IntegerType } from 'typeorm';

@Injectable()
export class StreamService {
    constructor(@InjectConnection() private readonly connection: Connection) {}
    async addStream(
        streamName: string,
      ): Promise<{ success: boolean; dataFound: boolean; streamId: IntegerType }> {
        // Call the stored procedure
        const [results] = await this.connection.query('CALL AddStream(?)', [
          streamName,
        ]);
    
        // Extract the success flag from the results
        const success = results[0].success;
        const dataFound = results[0].data_found;
        const streamId = results[0].stream_id

        return { success: !!success, dataFound: !!dataFound , streamId: streamId};
      }
}