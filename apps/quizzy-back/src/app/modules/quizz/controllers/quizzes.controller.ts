import { Controller, Get, Inject, Req, Post, Body, Header, Res, Param, Patch } from '@nestjs/common';
import { Auth } from '../../auth/auth.decorator';
import { QuizzRepository } from '../ports/quizz.repository';
import { RequestWithUser } from '../../auth/model/request-with-user';

export interface QuizzDataDto {
  id: string;
  title: string;
  description: string;
  questions : [];

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

  @Get('/:id')
  @Auth()
  async findQuiz(@Req() request: RequestWithUser, @Param('id') id): Promise <QuizzDataDto > {
    const uid = request.user.uid;
    const qid= id ;
    const quizz = await this.quizzRepository.getQuizByQuizId(uid,qid);
    return quizz;
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
  
  @Patch('/:id')
  @Auth()
  async updateQuiz( @Body() updateOperations: [{ op: string, path: string, value: string }],
  @Req() request: RequestWithUser, @Param('id') id): Promise <QuizzDataDto > {
    const uid = request.user.uid;
    const qid= id ;
    const titleOperation = updateOperations.find(operation => operation.path === '/title');

    if (titleOperation && titleOperation.op === 'replace') {
    await this.quizzRepository.updateQuizByQuidId(uid, qid, titleOperation.value);
    const quizz = await this.quizzRepository.getQuizByQuizId(uid,qid);
    return quizz;
  }

  }

  @Post('/:id/questions')
  @Auth()
  async addQuestion( @Body() title: string, answers: [{title: string, isCorrect: boolean}], @Param('id') idQuiz, @Req() request: RequestWithUser): Promise<void> {
    await this.quizzRepository.addQuestion(request.user.uid, idQuiz, title, answers);
  }

  @Get('/:id')
  @Auth()
  async getAll(@Req() request: RequestWithUser, @Param('id') id): Promise<QuizzDataDto> {
    const uid = request.user.uid;
    const qid = id;
    const quizz = await this.quizzRepository.getQuizAllQuestions(uid, qid);
    return quizz;
  }
}