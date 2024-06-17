import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class SectionService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async addSection(
    sectionName: string,
  ): Promise<{ success: boolean; data_found: boolean }> {
    // Call the stored procedure
    const [results] = await this.connection.query('CALL AddSection(?)', [
      sectionName,
    ]);

    // Extract the success flag from the results
    const success = results[0].success;
    const data_found = results[0].data_found;
    return { success: !!success, data_found: !!data_found };
  }

  async getSectionData(): Promise<{ sections: any[]; dataFound: Boolean }> {
    const [sections, flag] = await this.connection.query('CALL GetSections()');
    const dataFound = flag[0].data_found;
    return { sections, dataFound: !!dataFound };
  }

  async updateSection(sectionID: Number, sectionName: String): Promise<{success: boolean; dataFound: boolean, sectionExist: boolean}> {
    const [results] = await this.connection.query('CALL UpdateSection(?, ?)', [sectionID, sectionName]);
    const success = results[0]?.success;
    const dataFound = results[0]?.data_found;
    const sectionExist = results[0]?.name_exists;
    return {success: !!success, dataFound: !!dataFound, sectionExist: !!sectionExist}
  }

  async deleteSection(sectionID: Number): Promise<{success: boolean; dataFound: boolean}>{
    const [results] = await this.connection.query('CALL DeleteSection(?)', [sectionID, ]);
    const success = results[0]?.success;
    const dataFound = results[0]?.data_found;
    return {success: !!success, dataFound: !!dataFound}
  }
}
