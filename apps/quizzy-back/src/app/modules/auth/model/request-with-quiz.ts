import { Request } from 'express';
import { QuizDetails } from './quiz-details';

export interface RequestWithQuiz extends Request {
  quiz: QuizDetails;
}