import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthenticatedGaurd } from './auth/authenticated.gaurd';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req):any{
    console.log('error!!!!!!!!!!!!!!!');
    return {msg : 'Login successful!!'};
  }
  
  @UseGuards(AuthenticatedGaurd)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user;
  }
}
