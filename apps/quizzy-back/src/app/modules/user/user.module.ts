import { Module } from '@nestjs/common';
import { UserController } from '../../controllers/user/user.controller';

@Module({
    controllers: [UserController],
    providers: [{
        provide: UserRepository,
        useClass: FirebaseUserRepository,
    }],
    exports: [UserRepository]
})
export class UserModule {}
