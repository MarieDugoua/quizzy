import { Injectable } from '@nestjs/common';
import { QuizzRepository } from '../ports/quizz.repository';
import * as Admin from 'firebase-admin';
import { CreateQuizDto, QuizzDataDto } from '../controllers/quizzes.controller';

@Injectable()
export class QuizzFirebaseRepository implements QuizzRepository {
    async getQuizzesByUserId(userId: string): Promise<QuizzDataDto[]> {
        const collection = await Admin.firestore().collection(`users/${userId}/quizzes`).get();
        if (collection.empty) {
          return [];
        }
        return collection.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
        })) as QuizzDataDto[];
      }

      async createQuiz(createQuizDto: CreateQuizDto): Promise<string> {
        const quizRef = await Admin.firestore().collection('quizzes').add({
          title: createQuizDto.title,
          description: createQuizDto.description
        });
        return quizRef.id;
      }
}
