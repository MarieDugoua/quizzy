import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserRepository } from '../ports/user.repository';
import { User } from '../model/user';
import { UserDetailDto } from '../controllers/user.controller';

@Injectable()
export class UserFirebaseRepository implements UserRepository {
  async getUserFromToken(token: string): Promise<UserDetailDto> {
    const decodedToken = await admin.auth().verifyIdToken(token);

    return {
      email: decodedToken.email,
      uid: decodedToken.uid,
      username: decodedToken.username,
    };
  }

  async getUserByUid(uid: string): Promise<UserDetailDto> {
    const doc = await admin.firestore().doc(`users/${uid}`).get();
    if (!doc.exists) {
      throw new Error('User not found');
    }
    return {
      uid,
      username: doc.data().username,
      email: doc.data().email,
    };
  }

  async registerUser(user: User): Promise<void> {
    await admin.firestore().doc(`users/${user.uid}`).set({username: user.username});
  }
}
