import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
    @HttpCode(200)
    @Get('/version')
    GetVersion() {
      console.log(new Date())
      return this.appService.GetVersion()
    }
}
