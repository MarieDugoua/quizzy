import { Injectable } from '@nestjs/common';
import { QuizzRepository } from '../ports/quizz.repository';
import * as Admin from 'firebase-admin';
import { QuizzDataDto } from '../controllers/quizzes.controller';

@Injectable()
export class QuizzFirebaseRepository implements QuizzRepository {
    async getQuizzesByUserId(userId: string): Promise<QuizzDataDto> {
        const doc = await Admin.firestore().doc(`quizzes/${userId}`).get();
        
        if (!doc.exists) {
            throw new Error('Quizz not found');
        }
        
        return {
            id: doc.id,
            title: doc.data().title,
        };
    }
}