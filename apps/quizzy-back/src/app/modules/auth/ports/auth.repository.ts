import { UserDetails } from '../../model/user-details';

export const VersionRepository = Symbol('VersionRepository');
export interface VersionRepository {
  getUserFromToken(token: string): Promise<UserDetails>;

  getUserByUid(uid: string): Promise<UserDetails>;
}
