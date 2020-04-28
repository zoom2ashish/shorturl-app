import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export interface IOAuthConfig {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scope: string[];
  passReqToCallback: boolean;
}

@Injectable()
export class OAuth2Service {
  private _clientID: string;
  private _clientSecret: string;
  private _redirectUrl: string;

  private _oauth2Client: OAuth2Client;

  constructor() {
    this._clientID = process.env.GOOGLE_CLIENT_ID;
    this._clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    this._redirectUrl = process.env.GOOGLE_REDIRECT_URL;

    this._oauth2Client = new google.auth.OAuth2(
      this._clientID,
      this._clientSecret,
      this._redirectUrl);
  }

  getConfig(): IOAuthConfig {
    return {
      clientID: this._clientID,
      clientSecret: this._clientSecret,
      callbackURL: this._redirectUrl,
      scope: [ 'email', 'profile' ],
      passReqToCallback: true
    };
  }

  async verify(token: string) {
    return await this._oauth2Client.verifyIdToken({
      idToken: token, audience: this._clientID
    });
  }

  async getToken(code: string) {
    return await this._oauth2Client.getToken(code);
  }
}
