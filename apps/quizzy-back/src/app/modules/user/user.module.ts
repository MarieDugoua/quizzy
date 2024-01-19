import { Module } from '@nestjs/common';
import { UserController } from '../../controllers/user/user.controller';
import { UserRepository } from './ports/user.repository';
import { UserFirebaseRepository } from './infra/firebase-user.repository';

@Module({
    controllers: [UserController],
    providers: [{
        provide: UserRepository,
        useClass: UserFirebaseRepository,
    }],
    exports: [UserRepository]
})
export class UserModule {}
