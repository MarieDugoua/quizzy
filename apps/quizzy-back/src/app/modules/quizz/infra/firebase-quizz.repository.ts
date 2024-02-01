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
          throw new Error('Quiz not found');
        }
        return {
            id: doc.data().id,
            title:doc.data().title,
            description:doc.data().description,
            questions: doc.data().questions || [],
        }
      }

      async updateQuizByQuidId(userId: string, quizId: string, newTitle:string): Promise<QuizzDataDto> {

          const getQuiz =  await this.getQuizByQuizId(userId,quizId);
          if (getQuiz) console.log("fdsf");
          
          const doc = await Admin.firestore().doc(`users/${userId}/quizzes/${quizId}`).update({title:newTitle});
          console.log(doc);
          
          const updateDoc = await this.getQuizByQuizId(userId,quizId);
          return updateDoc
               

      }

      async addQuestion(userId: string, quizId: string, questionTitle: string, answersQuestions: [{title: string, isCorrect: boolean}]): Promise<string> {
        
        console.log(answersQuestions);
        const doc = await Admin.firestore().collection(`users/${userId}/quizzes/${quizId}/questions`).add({
          title: questionTitle,
          // answers: [{
          //   answersQuestions.forEach(element => {
          //     title: element.title,
          //     isCorrect: element.isCorrect
          //   })
          // }]
        });

        return doc.id;
      }

      async getQuizAllQuestions(userId: string, quizId: string): Promise<QuizzDataDto> {
        const doc = await Admin.firestore().doc(`users/${userId}/quizzes/${quizId}`).get();

        if(!doc.exists) {
          throw new Error('Quiz not found');
        }

        return {
          id: doc.data().id,
          title:doc.data().title,
          description:doc.data().description,
          questions: doc.data().questions
        }
      }
}
