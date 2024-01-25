import { Controller, Get, Inject, Req } from '@nestjs/common';
import { Auth } from '../../auth/auth.decorator';
import { QuizzRepository } from '../ports/quizz.repository';
import { RequestWithUser } from '../../auth/model/request-with-user';

export interface QuizzDataDto {
  id: string;
  title: string;
  description: string;
}


@Controller('quiz')
export class QuizzesController {
  constructor(@Inject(QuizzRepository) private readonly quizzRepository: QuizzRepository) {}

  @Get()
  @Auth()
  async findAll(@Req() request: RequestWithUser): Promise<QuizzDataDto[]> {
    const uid = request.user.uid;
    const quizz = await this.quizzRepository.getQuizzesByUserId(uid);

    return quizz;
  }
}