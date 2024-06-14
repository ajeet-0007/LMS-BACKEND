import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class SectionService {
    constructor(@InjectConnection() private readonly connection: Connection){

    }

    async addSection(sectionName: string): Promise<{ success: boolean }> {
        // Call the stored procedure
        const [results] = await this.connection.query(
          'CALL AddSection(?)', 
          [sectionName]
        );
    
        // Extract the success flag from the results
        const success = results[0].success;
        return { success: !!success };
    }
}
