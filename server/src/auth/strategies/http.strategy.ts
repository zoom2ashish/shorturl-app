import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-http-bearer";
import { OAuth2Service } from "../oauth2.service";
import { UsersService } from "src/services/users.service";

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly oAuth2: OAuth2Service, private readonly usersService: UsersService) {
    super({
      passReqToCallback: true
    });
  }

  async validate(req: Request, token: string, done: Function) {
    try {
      const user = await this.oAuth2.verify(token);
      if (!user) {
        throw new UnauthorizedException();
      }

      // If user found
      const payload = user.getPayload();
      let registeredUser = await this.usersService.find(payload.email);
      if (!registeredUser) {
        registeredUser = await this.usersService.register('google', payload.email, payload.name);
      }

      done(null, registeredUser.toObject());

      return user;
    } catch (err) {
      done(err, null);
    }
  }
}