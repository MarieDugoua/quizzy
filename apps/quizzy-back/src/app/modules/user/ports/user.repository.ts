import { UserDetails } from '../../model/user-details';

export const UserRepository = Symbol('UserRepository');
export interface UserRepository {
  getUserFromToken(token: string): Promise<UserDetails>;

  getUserByUid(uid: string): Promise<UserDetails>;
}
