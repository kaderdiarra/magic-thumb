import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('auth/redirect')
  getInstaAccessToken(@Query('code') verificationCode): Promise<string> {
    // ask for authorization
    const accessToken = this.appService.getInstaAccessToken(verificationCode);
    return accessToken;
  }
}
