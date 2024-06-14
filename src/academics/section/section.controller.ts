import { Body, Controller, Post, Req } from '@nestjs/common';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
   
    constructor(private readonly sectionService: SectionService){}

    @Post('/add-section')
    async insertSectionData(@Body('section') section: string){
        const result = await this.sectionService.addSection(section);
        return result;
    }
}
