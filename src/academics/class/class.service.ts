import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, IntegerType } from 'typeorm';

@Injectable()
export class ClassService {
    constructor(@InjectConnection() private readonly connection: Connection) {}
    async addClass(
        className: string, classSection: string, classStream: string
      ): Promise<{ success: boolean; dataFound: boolean; classId: Number }> {
        // Call the stored procedure
        const [results] = await this.connection.query('CALL AddClass(?, ?, ?)', [
          className, classSection, classStream
        ]);
    
        // Extract the success flag from the results
        const success = results[0]?.success;
        const dataFound = results[0]?.data_found;
        const classId = results[0]?.class_id;
        return { success: !!success, dataFound: !!dataFound, classId: classId };
      }

      async getClassesData(): Promise<{ classes: any[]; dataFound: Boolean }> {
        const [classes, flag] = await this.connection.query('CALL GetClasses()');
        const dataFound = flag[0].data_found;
        return { classes, dataFound: !!dataFound };
      }

      async deleteClass(class_id: Number): Promise<{success: boolean; dataFound: boolean}>{
        const [results] = await this.connection.query('CALL deleteClass(?)', [class_id]);
        const success = results[0]?.success;
        const dataFound = results[0]?.data_found;
        return {success: !!success, dataFound: !!dataFound};
      }

      async updateClass(class_id: Number, class_json : JSON): Promise<{success: boolean; dataFound: boolean}>{
        const jsonData = JSON.stringify(class_json)
        const [results] = await this.connection.query('Call UpdateClassFromJson(?, ?)', [class_id, jsonData]);
        const success = results[0]?.success;
        const dataFound = results[0]?.data_found;
        return {success:!!success, dataFound: !!dataFound}
      }
}
