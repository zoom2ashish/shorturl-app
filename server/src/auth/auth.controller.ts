import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { OAuth2Service } from './oauth2.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly oauth2: OAuth2Service) {
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('/google/callback')
  async callback(@Req() request: Request) {
    const accessCode: string = request.query.code as string;
    return await this.oauth2.getToken(accessCode).then(_ => _.tokens);
  }

  @Get('/protected')
  @UseGuards(AuthGuard('bearer'))
  protectedRoute(@Req() req: Request) {
    console.log('User Info:', req.user);
    return 'Protected route accessed';
  }
}
