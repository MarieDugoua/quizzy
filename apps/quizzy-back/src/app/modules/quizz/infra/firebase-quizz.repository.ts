import { Injectable } from '@nestjs/common';
import { QuizzRepository } from '../ports/quizz.repository';
import * as Admin from 'firebase-admin';
import { QuizzDataDto } from '../controllers/quizzes.controller';

@Injectable()
export class QuizzFirebaseRepository implements QuizzRepository {
    async getQuizzesByUserId(userId: string): Promise<QuizzDataDto[]> {
        const collection = await Admin.firestore().collection(`users/${userId}/quizzes`).get();
        
        if (!collection.docs) {
           return []
        }
        
        return collection.docs;
    }
}