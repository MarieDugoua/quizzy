import { AuthGuard } from './auth.guard';
import { AuthRepository } from './ports/auth.repository';
import { AuthFirebaseRepository } from './infra/firebase-auth.repository';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [
    AuthGuard,
    { provide: AuthRepository, useClass: AuthFirebaseRepository },
  ],
  exports: [AuthGuard, AuthRepository],
})
export class AuthModule {}
