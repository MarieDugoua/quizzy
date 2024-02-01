 import { Controller, Get, Inject, Req, Post, Body, Header, Res } from '@nestjs/common';
import { Auth } from '../../auth/auth.decorator';
import { QuizzRepository } from '../ports/quizz.repository';
import { RequestWithUser } from '../../auth/model/request-with-user';

export interface QuizzDataDto {
  id: string;
  title: string;
  description: string;
}

export class CreateQuizDto {
  readonly title: string;
  readonly description: string;
}

@Controller('quiz')
export class QuizzesController {
  constructor(@Inject(QuizzRepository) private readonly quizzRepository: QuizzRepository) {}

  @Get()
  @Auth()
  async findAll(@Req() request: RequestWithUser): Promise<{ data: QuizzDataDto[] }> {
    const uid = request.user.uid;
    const quizz = await this.quizzRepository.getQuizzesByUserId(uid);
    return { data: quizz };
  }

  @Post()
  @Auth()
  @Header('Location', '/quiz/:id') 
  
  async create(@Body() createQuizDto: CreateQuizDto, @Res() res,@Req() request: RequestWithUser): Promise<void> {
    const uid = request.user.uid;    
    const quizId = await this.quizzRepository.createQuiz(createQuizDto,uid);
    
    if (quizId) {
      const baseUrl = 'http://localhost:3000/'; 
      const locationHeader = `${baseUrl}/quiz/${quizId}`;
      res.header('Location', locationHeader);
      res.send(); 
     }
}
}