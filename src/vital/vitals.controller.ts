import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { VitalsEntity, GetUser } from 'src/common';
import { vitalsDto } from './dto';
import { ApiAcceptedResponse, ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VitalsService } from './vitals.service';

@ApiBearerAuth()
@ApiTags('Vitals')
@Controller('vitals')
export class VitalsController { 
    constructor(private vitalsService: VitalsService){}

    @ApiCreatedResponse({
        type: VitalsEntity
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async createVitals(@GetUser('sub') userId : string, @Body() dto : vitalsDto): Promise<VitalsEntity> {
        return await this.vitalsService.createVitals(userId, dto)
    }

    @ApiResponse({
        type: VitalsEntity
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async getVitals(@GetUser('sub') userId : string, @Param('id') id : string): Promise<VitalsEntity> {
        return await this.vitalsService.getVitals(userId, id)
    }


    @ApiAcceptedResponse({
        type: VitalsEntity,
        description: 'Returns updated Vitals object'
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Patch(':id')
    async editVitals(@GetUser('sub') userId : string, @Param('id') id : string, @Body() dto : vitalsDto): Promise<VitalsEntity> {
        return await this.vitalsService.editVitals(userId, id, dto)
    }

    @ApiAcceptedResponse({
        type: VitalsEntity,
        description: 'Returns deleted Vitals object'
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Delete(':id')
    async deleteVitals(@GetUser('sub') userId : string, @Param('id') id : string){
        return await this.vitalsService.deleteVitals(userId, id)
    }
}
