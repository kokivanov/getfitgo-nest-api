import { VitalController } from './vital.controller';
import { VitalService } from './vital.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [VitalController],
    providers: [
        VitalService,],
})
export class VitalModule { }
