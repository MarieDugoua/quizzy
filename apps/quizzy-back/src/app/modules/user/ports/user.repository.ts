import { User } from '../model/user';

export const UserRepository = Symbol('UserRepository');
export interface UserRepository {
  getUserFromToken(token: string): Promise<User>;
  getUserByUid(uid: string): Promise<User>;
  registerUser(user: User): Promise<void>;
}
