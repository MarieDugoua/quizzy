import { Controller, Inject, Post, Req, Body, Get } from '@nestjs/common';
import { Auth } from '../../auth/auth.decorator';
import { RequestWithUser } from '../../auth/model/request-with-user';
import { UserRepository } from '../ports/user.repository';

export interface CreateUserDataDto {
    username: string;
}

export interface UserDetailDto {
    username: string;
    uid: string;
    email: string;
}

@Controller('users')
export class UserController {
    constructor(@Inject(UserRepository) private readonly userRepository: UserRepository) {}

    @Post()
    @Auth()
    async register(@Req() request: RequestWithUser, @Body() userData: CreateUserDataDto): Promise<void> {
       await this.userRepository.registerUser( {uid: request.user.uid, username: userData.username });
    }

    @Get("/me")
    @Auth()
    async getMe(@Req() request: RequestWithUser): Promise<UserDetailDto> {
        return {
            uid: '123',
            email: 'mail',
            username: 'user.username',
        };
    }

}
