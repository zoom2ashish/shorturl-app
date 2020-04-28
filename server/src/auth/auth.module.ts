import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { OAuth2Service } from './oauth2.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { HttpStrategy } from './strategies/http.strategy';
import { authenticate } from 'passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { UsersService } from 'src/services/users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [
    AuthController
  ],
  providers: [
    OAuth2Service,
    UsersService,
    GoogleStrategy,
    HttpStrategy
  ]
})
export class AuthModule {
}
