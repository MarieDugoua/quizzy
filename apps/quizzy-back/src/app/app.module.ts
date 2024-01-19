import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingModule } from './modules/ping/ping.module';
import { FirebaseModule } from 'nestjs-firebase';
import { AuthMiddleware } from './modules/auth/auth.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserController } from './modules/user/controllers/user.controller';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    PingModule,
    FirebaseModule.forRoot({
      googleApplicationCredential:
        'apps/quizzy-back/src/assets/quizzy-2d45f-firebase-adminsdk-uzcry-d655cfea9c.json',
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
