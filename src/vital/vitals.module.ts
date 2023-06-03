import { VitalsController } from './vitals.controller';
import { VitalsService } from './vitals.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [VitalsController],
    providers: [
        VitalsService,],
})
export class VitalModule { }
