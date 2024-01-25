import { Injectable } from '@nestjs/common';
import { QuizzRepository } from '../ports/quizz.repository';
import * as Admin from 'firebase-admin';
import { QuizzDataDto } from '../controllers/quizzes.controller';

@Injectable()
export class QuizzFirebaseRepository implements QuizzRepository {
    async getQuizzesByUserId(userId: string): Promise<QuizzDataDto> {
        const db = Admin.firestore();
        const quizz = await db.collection('quizzes').doc(userId).get();
        return {
            id: quizz.id,
            title: quizz.data().title,
        };
    }
}