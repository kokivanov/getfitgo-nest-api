import { Injectable } from '@nestjs/common';
const VER = require("../package.json").version

@Injectable()
export class AppService {
  GetVersion() {
    return VER
  }
}
