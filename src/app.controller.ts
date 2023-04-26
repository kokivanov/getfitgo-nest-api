import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller({
  version: ["1"]
})
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiOkResponse({
    type: String,
    description: "Returns current version of API",
    
  })  
  @Public()
    @HttpCode(200)
    @Get('/version')
    GetVersion() {
      return this.appService.GetVersion()
    }
}
