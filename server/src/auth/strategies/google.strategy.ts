import { Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Service } from "../oauth2.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly oAuth2: OAuth2Service) {
    super(oAuth2.getConfig());
  }
}
