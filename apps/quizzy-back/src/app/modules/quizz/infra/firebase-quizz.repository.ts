import { Injectable } from '@nestjs/common';
import { QuizzRepository } from '../ports/quizz.repository';
import * as Admin from 'firebase-admin';
import { CreateQuestionDto, CreateQuizDto, QuestionDataDto, QuizzDataDto } from '../controllers/quizzes.controller';

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
          description: createQuizDto.description,
        });
        return quizRef.id;
      }

      

      // Assurez-vous d'importer les interfaces QuizzDataDto et QuestionDataDto ici

async getQuizByQuizId(userId: string, quizId:string): Promise<QuizzDataDto> {
  const doc = await Admin.firestore().doc(`users/${userId}/quizzes/${quizId}`).get();
  
  console.log(doc.data());
  
  if (!doc.exists) {
    throw new Error('Quiz not found');
  }

  const questionsSnapshot = await Admin.firestore().collection(`users/${userId}/quizzes/${quizId}/questions`).get();


  const questions = questionsSnapshot.docs.map(doc => ({
    title: doc.data().title,
    answers: doc.data().answers
  })) as QuestionDataDto[];

  return {
    title: doc.data().title,
    questions: questions
  } as QuizzDataDto;
}

      
      

      async updateQuizByQuidId(userId: string, quizId: string, newTitle:string): Promise<QuizzDataDto> {

          const getQuiz =  await this.getQuizByQuizId(userId,quizId);
          if (getQuiz) console.log("fdsf");
          
          const doc = await Admin.firestore().doc(`users/${userId}/quizzes/${quizId}`).update({title:newTitle});
          
          const updateDoc = await this.getQuizByQuizId(userId,quizId);
          return updateDoc
               

      }

      async addQuestion(userId: string, quizId: string,createQuestionDto: CreateQuestionDto): Promise<string> {
        const question = await Admin.firestore().collection(`users/${userId}/quizzes/${quizId}/questions`).add({
          title: createQuestionDto.title,
          answers: createQuestionDto.answers
        });
        return question.id;
      }

      async getQuizAllQuestions(userId: string, quizId: string): Promise<string> {
        const col = await Admin.firestore().collection(`users/${userId}/quizzes/${quizId}/questions`).get();
        console.log(col,"test");
        
        /*if(!col.empty) {
          throw new Error('question not found');
        }*/

        /*let questions: QuestionDataDto[];

        col.forEach(element => {
          questions.push({title: element})
        });

        return col.docs.map(doc => ({
          id : doc.id,
          title: ,
          answers: doc.get(),
        })) as QuestionDataDto[];
      }*/
      return 'dsfdss';
}}
