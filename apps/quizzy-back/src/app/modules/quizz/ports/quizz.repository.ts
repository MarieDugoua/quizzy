import { CreateQuestionDto, CreateQuizDto, QuestionDataDto, QuizzDataDto } from "../controllers/quizzes.controller";

export const QuizzRepository = Symbol('QuizzRepository');
export interface QuizzRepository {
  
    getQuizzesByUserId(userId: string): Promise<QuizzDataDto[]>;
    createQuiz(createQuizDto: CreateQuizDto, userId: string): Promise<string>;
    getQuizByQuizId(userId: string, quizId : string): Promise<QuizzDataDto>;
    updateQuizByQuidId(userId: string, quizId : string,newTitle:string): Promise<QuizzDataDto>;
    addQuestion(userId: string, quizId: string, createQuestionDto: CreateQuestionDto): Promise<string>;
    //getQuizAllQuestions(userId: string, quizId: string): Promise<string>;
  }