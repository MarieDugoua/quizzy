import { AuthGuard } from './auth.guard';
import { VersionRepository } from './ports/auth.repository';
import { VersionFirebaseRepository } from './infra/firebase-auth.repository';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [
    AuthGuard,
    { provide: VersionRepository, useClass: VersionFirebaseRepository },
  ],
  exports: [AuthGuard, VersionRepository],
})
export class AuthModule {}
