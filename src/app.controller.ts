import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
    @Public()
    @HttpCode(200)
    @Get('/version')
    GetVersion() {
      return this.appService.GetVersion()
    }
}
