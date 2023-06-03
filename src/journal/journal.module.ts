import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        JournalController,],
    providers: [
        JournalService,],
})
export class JournalModule { }
