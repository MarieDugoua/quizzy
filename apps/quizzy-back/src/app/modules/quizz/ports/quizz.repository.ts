import { CreateQuizDto, QuizzDataDto } from "../controllers/quizzes.controller";

export const QuizzRepository = Symbol('QuizzRepository');
export interface QuizzRepository {
  
    getQuizzesByUserId(userId: string): Promise<QuizzDataDto[]>;
    createQuiz(createQuizDto: CreateQuizDto, userId: string): Promise<string>;
    getQuizByQuizId(userId: string, quizId : string): Promise<QuizzDataDto>;
  }