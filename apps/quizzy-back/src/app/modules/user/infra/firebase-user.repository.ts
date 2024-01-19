import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserDetails } from '../../auth/model/user-details';
import { UserRepository } from '../ports/user.repository';
import { User } from '../model/user';

@Injectable()
export class UserFirebaseRepository implements UserRepository {
  /*async getUserFromToken(token: string): Promise<UserDetails> {
    const decodedToken = await admin.auth().verifyIdToken(token);

    return {
      email: decodedToken.email,
      uid: decodedToken.uid,
      username: decodedToken.username,
    };
  }

  async getUserByUid(uid: string): Promise<UserDetails> {
    return await admin
      .auth()
      .getUser(uid)
      .then((user) => ({
        username: user.displayName,
        email: user.email,
        uid: user.uid,
      }));
  }*/

  async registerUser(user: User): Promise<void> {
    await admin.firestore().doc(`users/${user.uid}`).set({username: user.username});
  }
}
