import { CreateQuizDto, QuizzDataDto } from "../controllers/quizzes.controller";

export const QuizzRepository = Symbol('QuizzRepository');
export interface QuizzRepository {
  
    getQuizzesByUserId(userId: string): Promise<QuizzDataDto[]>;
    createQuiz(createQuizDto: CreateQuizDto): Promise<string>;
    
  }