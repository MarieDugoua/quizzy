import { Controller, Get, Inject, Req } from '@nestjs/common';
import { Auth } from '../../auth/auth.decorator';
import { QuizzRepository } from '../ports/quizz.repository';

export interface QuizzDataDto {
  id: string;
  title: string;
}

@Controller('quizzes')
export class QuizzesController {
  constructor(@Inject(QuizzRepository) private readonly quizzRepository: QuizzRepository) {}

  @Get()
  @Auth()
  async findAll(@Req() request): Promise<QuizzDataDto> {
    const uid = request.user.uid;
    const quizz = await this.quizzRepository.getQuizzesByUserId(uid);

    return {
      id: quizz.id,
      title: quizz.title,
    };
  }
}