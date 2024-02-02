import { UserController } from './user.controller';
import { UserRepository } from '../ports/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { RequestWithUser } from '../../auth/model/request-with-user';

describe('UserController', () => {
  let controller: UserController;
  let mockUserRepository: Partial<Record<keyof UserRepository, jest.Mock>>;

  beforeEach(async () => {
    mockUserRepository = {
      registerUser: jest.fn(),
      getUserByUid: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call registerUser with correct parameters', async () => {
      const req = { user: { uid: '123' } } as RequestWithUser;
      const userData = { username: 'testuser' };

      await controller.register(req, userData);

      expect(mockUserRepository.registerUser).toHaveBeenCalledWith({
        uid: '123',
        username: 'testuser',
      });
    });
  });

  describe('getMe', () => {
    it('should return the current user details', async () => {
      const req = { user: { uid: '123', email: 'test@example.com' } } as RequestWithUser;
      const expectedUserDetail = {
        username: 'testuser',
        uid: '123',
        email: 'test@example.com',
      };

      mockUserRepository.getUserByUid.mockResolvedValue({ username: 'testuser' });

      const result = await controller.getMe(req);

      expect(result).toEqual(expectedUserDetail);
      expect(mockUserRepository.getUserByUid).toHaveBeenCalledWith('123');
    });
  });
});
