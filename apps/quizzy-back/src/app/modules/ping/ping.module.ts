import { Module } from '@nestjs/common';
import { PingController } from './ping.controller';
import { VersionRepository } from './ports/out/version.repository';
import { VersionFirebaseRepository } from '../auth/infra/firebase-auth.repository';

@Module({
  controllers: [PingController],
  providers: [
    {provide : VersionRepository, useClass: VersionFirebaseRepository },
  ],
  exports : [VersionRepository]
})
export class PingModule {}
