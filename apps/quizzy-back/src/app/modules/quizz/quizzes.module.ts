import { Module } from '@nestjs/common';
import { QuizzesController } from './controllers/quizzes.controller';
import { QuizzRepository } from './ports/quizz.repository';
import { QuizzFirebaseRepository } from './infra/firebase-quizz.repository';

@Module({
    controllers: [QuizzesController],
    providers: [
      {
        provide: QuizzRepository,
        useClass: QuizzFirebaseRepository,
      },
    ],
    exports: [QuizzRepository],
  })
  export class QuizzesModule {}
  