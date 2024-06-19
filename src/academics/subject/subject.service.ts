import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, IntegerType } from 'typeorm';

@Injectable()
export class SubjectService {
    constructor(@InjectConnection() private readonly connection: Connection){}
        async addSubject(body: any, fileString: string) : Promise<{success : boolean, subjectId: Number, dataFound: boolean}>{
            const [results] = await this.connection.query('CALL AddSubject(?, ?, ?, ?, ?, ?)', ['', body.subject_name, body.subject_type, body.subject_code, body.subject_background_color, fileString]);
            const success= results[0]?.success;
            const subjectId = results[0]?.subject_id;
            const dataFound = results[0]?.data_found;
            return {success: !!success, subjectId: subjectId, dataFound: dataFound}
        }
    
}
