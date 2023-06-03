import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { JournalEntity, GetUser } from 'src/common';
import { journalDto } from './dto';
import { ApiAcceptedResponse, ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JournalService } from './journal.service';

@ApiBearerAuth()
@ApiTags('Journal')
@Controller('journal')
export class JournalController { 
    constructor(private journalService: JournalService){}

    @ApiCreatedResponse({
        type: JournalEntity
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async createJournal(@GetUser('sub') userId : string, @Body() dto : journalDto) {
        return await this.journalService.createJournal(userId, dto)
    }

    @ApiResponse({
        type: JournalEntity
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async getJournal(@GetUser('sub') userId : string, @Param('id') id : string) {
        return await this.journalService.getJournal(userId, id)
    }

    @ApiResponse({
        type: JournalEntity
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getJournals(@GetUser('sub') userId : string, @Query('page') page: number, @Query('per_page') per_page: number) {
        return await this.journalService.getJournals(userId, page, per_page)
    }

    @ApiAcceptedResponse({
        type: JournalEntity,
        description: 'Returns updated Journal object'
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Patch(':id')
    async editJournal(@GetUser('sub') userId : string, @Param('id') id : string, @Body() dto : journalDto) {
        return await this.journalService.editJournal(userId, id, dto)
    }

    @ApiAcceptedResponse({
        type: JournalEntity,
        description: 'Returns deleted Journal object'
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Delete(':id')
    async deleteJournal(@GetUser('sub') userId : string, @Param('id') id : string){
        return await this.journalService.deleteJournal(userId, id)
    }
}
