import { Protocol, OnVerify, OnInstall } from '@tsed/passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Req, HeaderParams, Scope, ProviderScope } from '@tsed/common';

@Protocol({
  name: 'googleJwt',
  useStrategy: BearerStrategy,
  settings: {}
})
export class GoogleJwtProtocol implements OnVerify, OnInstall {

  constructor() {}

  async $onVerify(@Req() request: Req, @HeaderParams('Authorization') authorizationHeader) {
    console.log(`[GoogleJwtProtocol] Authorization ${authorizationHeader} --`);
    return true;
  }

  $onInstall(strategy: BearerStrategy) {
    console.log(`${strategy.name} installed`);
  }
}