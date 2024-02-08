import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesController } from './quizzes.controller';
import { QuizzRepository } from '../ports/quizz.repository';
import { RequestWithUser } from '../../auth/model/request-with-user';

describe('QuizzesController', () => {
  let controller: QuizzesController;
  let mockQuizzRepository: Partial<Record<keyof QuizzRepository, jest.Mock>>;

  beforeEach(async () => {
    mockQuizzRepository = {
      getQuizzesByUserId: jest.fn(),
      getQuizByQuizId: jest.fn(),
      createQuiz: jest.fn(),
      updateQuizByQuidId: jest.fn(),
      addQuestion: jest.fn(),
      getQuizAllQuestions: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizzesController],
      providers: [
        {
          provide: QuizzRepository,
          useValue: mockQuizzRepository,
        },
      ],
    }).compile();

    controller = module.get<QuizzesController>(QuizzesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of quizzes', async () => {
      const req = { user: { uid: 'user1' } } as RequestWithUser;
      const mockQuizzes = [{ id: 'quiz1', title: 'Quiz 1', description: 'Description 1', questions: [] }];
      mockQuizzRepository.getQuizzesByUserId.mockResolvedValue(mockQuizzes);
  
      const result = await controller.findAll(req);
  
      expect(result).toEqual({ data: mockQuizzes });
      expect(mockQuizzRepository.getQuizzesByUserId).toHaveBeenCalledWith('user1');
    });
  });

  describe('findQuiz', () => {
    it('should return a single quiz data', async () => {
      const req = { user: { uid: 'user1' } } as RequestWithUser;
      const mockQuiz = { id: 'quiz1', title: 'Quiz 1', description: 'Description 1', questions: [] };
      const quizId = 'quiz1';
      mockQuizzRepository.getQuizByQuizId.mockResolvedValue(mockQuiz);
  
      const result = await controller.findQuiz(req, quizId);
  
      expect(result).toEqual(mockQuiz);
      expect(mockQuizzRepository.getQuizByQuizId).toHaveBeenCalledWith('user1', 'quiz1');
    });
  });
  
  describe('create', () => {
    it('should create a new quiz and return the location of the new resource', async () => {
      const req = { user: { uid: 'user1' } } as RequestWithUser;
      const createQuizDto = { title: 'New Quiz', description: 'New Description' };
      const mockResponse = {
        header: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };
      const generatedQuizId = 'quiz2';
      mockQuizzRepository.createQuiz.mockResolvedValue(generatedQuizId);
  
      await controller.create(createQuizDto, mockResponse, req);
  
      expect(mockQuizzRepository.createQuiz).toHaveBeenCalledWith(createQuizDto, 'user1');
      expect(mockResponse.header).toHaveBeenCalledWith('Location', 'http://localhost:3000//quiz/quiz2');
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
  
  describe('updateQuiz', () => {
    it('should update the quiz title and return the updated quiz', async () => {
      const req = { user: { uid: 'user1' } } as RequestWithUser;
      const quizId = 'quiz1';
      const updateOperations: [{ op: string; path: string; value: string; }] = [{ op: 'replace', path: '/title', value: 'Updated Quiz Title' }];

      const updatedQuiz = {
        id: quizId,
        title: 'Updated Quiz Title',
        description: 'Description 1',
        questions: [],
      };
      mockQuizzRepository.updateQuizByQuidId.mockResolvedValue(undefined); 
      mockQuizzRepository.getQuizByQuizId.mockResolvedValue(updatedQuiz);
  
      const result = await controller.updateQuiz(updateOperations, req, quizId);
  
      expect(result).toEqual(updatedQuiz);
      expect(mockQuizzRepository.updateQuizByQuidId).toHaveBeenCalledWith('user1', quizId, 'Updated Quiz Title');
      expect(mockQuizzRepository.getQuizByQuizId).toHaveBeenCalledWith('user1', quizId);
    });
  });
  
  describe('addQuestion', () => {
    it('should add a new question to the quiz', async () => {
      const req = { user: { uid: 'user1' } } as RequestWithUser;
      const quizId = 'quiz1';
      const newQuestion = {
        title: 'New Question',
        answers: [
          { title: 'Answer 1', isCorrect: false },
          { title: 'Answer 2', isCorrect: true },
        ],
      };
      mockQuizzRepository.addQuestion.mockResolvedValue(undefined);
  
      await controller.addQuestion(newQuestion, quizId, req);
  
      expect(mockQuizzRepository.addQuestion).toHaveBeenCalledWith('user1', quizId, newQuestion.title, newQuestion.answers);
    });
  });
  
  describe('getAll', () => {
    it('should return a quiz with all its questions', async () => {
      const req = { user: { uid: 'user1' } } as RequestWithUser;
      const quizId = 'quiz1';
      const mockQuizWithQuestions = {
        id: 'quiz1',
        title: 'Quiz 1',
        description: 'Description 1',
        questions: [
          { title: 'Question 1', answers: [{ title: 'Answer 1', isCorrect: true }] }
        ]
      };
      mockQuizzRepository.getQuizAllQuestions.mockResolvedValue(mockQuizWithQuestions);
  
      const result = await controller.getAll(req, quizId);
  
      expect(result).toEqual(mockQuizWithQuestions);
      expect(mockQuizzRepository.getQuizAllQuestions).toHaveBeenCalledWith('user1', 'quiz1');
    });
  });

});
