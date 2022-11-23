import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async insertEvent(@Body() data: any): Promise<string> {
    // console.log(data);
    // return 'Success';
    return this.appService.verifyAndInsert(data);
  }

  @Get()
  get(): string {
    // console.log(data);
    return 'Success';
    // return this.appService.verifyAndInsert(data);
  }
}
