import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingModule } from './modules/ping/ping.module';
import { FirebaseModule } from 'nestjs-firebase';
import { AuthModule } from './modules/auth/auth.module';
import { UserController } from './controllers/user/user.controller';
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
export class AppModule {}
