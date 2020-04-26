import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotEnv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as methodOverride from 'method-override';
import * as session from 'express-session';
import * as serveStatic from 'serve-static';
import { join } from 'path';
import { NotFoundExceptionFilter } from './filters/notfoundexception.filter';

// Load Configuration
dotEnv.config();

const PORT = process.env.PORT || 5000;
const UI_PATH = join(__dirname, '../../client/build');

async function bootstrap() {
  try {
    console.log('Start server...');
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new NotFoundExceptionFilter());

    // Add Global Middleware
    app
      .use(cookieParser())
      .use(serveStatic(UI_PATH, {}))
      .use(compression())
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }))
      .use(session({
        secret: process.env.SECRET_KEY || 'mySecretKey',
        name: 'sessionid',
        resave: true,
        saveUninitialized: true,
        cookie: {
          path: '/',
          httpOnly: true,
          secure: false,
          maxAge: null
        }
      }));

    await app.listen(PORT);
    console.log('Start initialized...');
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
