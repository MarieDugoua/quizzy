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

      async createQuiz(createQuizDto: CreateQuizDto, userId: string): Promise<string> {
        const quizRef = await Admin.firestore().collection(`users/${userId}/quizzes`).add({
          title: createQuizDto.title,
          description: createQuizDto.description
        });
        return quizRef.id;
      }

      async getQuizByQuizId(userId: string,quizId : string): Promise<QuizzDataDto> {


        const doc = await Admin.firestore().doc(`users/${userId}/quizzes/${quizId}`).get();

        if (!doc.exists) {
          throw new Error('User not found');
        }
        return {
            id: doc.data().id,
            title:doc.data().title,
            description:doc.data().description,
            questions: doc.data().questions || [],
        }
      }
}
