import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotEnv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as methodOverride from 'method-override';

const envConfig = dotEnv.config();
console.log('envConfig: ', envConfig);
const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    console.log('Start server...');
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT);
    console.log('Start initialized...');

    app
      .use(cookieParser())
      .use(compression())
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

  } catch (err) {
    console.log(err);
  }
}
bootstrap();
