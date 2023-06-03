import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { BiometryEntity, GetUser } from 'src/common';
import { biometryDto } from './dto';
import { ApiAcceptedResponse, ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BiometryService } from './biometry.service';

@ApiBearerAuth()
@ApiTags('Biometry')
@Controller('biometry')
export class BiometryController { 
    constructor(private biometryService: BiometryService){}

    @ApiCreatedResponse({
        type: BiometryEntity
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async createBiometry(@GetUser('sub') userId : string, @Body() dto : biometryDto): Promise<BiometryEntity> {
        return await this.biometryService.createBiometry(userId, dto)
    }

    @ApiResponse({
        type: BiometryEntity
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async getBiometry(@GetUser('sub') userId : string, @Param('id') id : string): Promise<BiometryEntity> {
        return await this.biometryService.getBiometry(userId, id)
    }


    @ApiAcceptedResponse({
        type: BiometryEntity,
        description: 'Returns updated Biometry object'
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Patch(':id')
    async editBiometry(@GetUser('sub') userId : string, @Param('id') id : string, @Body() dto : biometryDto): Promise<BiometryEntity> {
        return await this.biometryService.editBiometry(userId, id, dto)
    }

    @ApiAcceptedResponse({
        type: BiometryEntity,
        description: 'Returns deleted Biometry object'
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Delete(':id')
    async deleteBiometry(@GetUser('sub') userId : string, @Param('id') id : string){
        return await this.biometryService.deleteBiometry(userId, id)
    }
}
