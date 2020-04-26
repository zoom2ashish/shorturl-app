import { ServerSettings, ServerLoader, GlobalAcceptMimesMiddleware } from '@tsed/common';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as methodOverride from 'method-override';
import { resolve, join } from 'path';
import { UrlRedirectionController } from './controllers/url-redirection/url-redirection.controller';
import * as serveStatic from 'serve-static';
import { $log } from '@tsed/common';
import * as dotEnv from 'dotenv';
import '@tsed/passport';
import * as session from 'express-session';

const envConfig = dotEnv.config();

const rootDir = resolve(__dirname);
const UI_PATH = join(rootDir, '../../client/build');

// console.log('PORT=', process.env.PORT);
// console.log('MONGOOSE_URL=', process.env.MONGOOSE_URL);
// console.log('UI_PATH=', UI_PATH);
// console.log('Protocols path: ', `${rootDir}/protocols/*.ts`);

@ServerSettings({
  rootDir,
  port: process.env.PORT || 5000,
  acceptMimes: [ 'application/json' ],
  mount: {
    '/api/v1': `${rootDir}/controllers/url-management/**/*.ts`,
    '/': UrlRedirectionController
  },
  componentsScan: [
    `${rootDir}/protocols/*{.ts,.js}`
  ],
  mongoose: {
    urls: {
      default: {
        url: process.env.MONGOOSE_URL,
        connectionOptions: {}
      }
    }
  },
  passport: {}
})
export class Server extends ServerLoader {

  public $beforeRoutesInit(): void | Promise<any> {
    debugger;
    this
      .use(GlobalAcceptMimesMiddleware)
      .use(serveStatic(UI_PATH, {}))
      .use(cookieParser())
      .use(compression())
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }))
      .use(session({
        secret: process.env.SECRET_KEY || 'mySecretKey',
        resave: true,
        saveUninitialized: true,
        cookie: {
          path: '/',
          httpOnly: true,
          secure: false,
          maxAge: null
        }
      }));
  }

}