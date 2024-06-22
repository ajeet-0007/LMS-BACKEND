import { Global, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, IntegerType } from 'typeorm';

@Global()
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

      async getStreamData(): Promise<{ streams: any[]; dataFound: Boolean }> {
        const [streams, flag] = await this.connection.query('CALL GetStreams()');
        const dataFound = flag[0]?.data_found;
        return { streams, dataFound: !!dataFound };
      }

      async updateSection(streamId: Number, streamName: String): Promise<{success: boolean; dataFound: boolean, streamExist: boolean}> {
        const [results] = await this.connection.query('CALL UpdateStream(?, ?)', [streamId, streamName]);
        const success = results[0]?.success;
        const dataFound = results[0]?.data_found;
        const streamExist = results[0]?.stream_exists;
        return {success: !!success, dataFound: !!dataFound, streamExist: !!streamExist}
      }

      async deleteStream(streamId: Number): Promise<{success: boolean; dataFound: boolean}>{
        const [results] = await this.connection.query('CALL DeleteStream(?)', [streamId, ]);
        const success = results[0]?.success;
        const dataFound = results[0]?.data_found;
        return {success: !!success, dataFound: !!dataFound}
      }
}
