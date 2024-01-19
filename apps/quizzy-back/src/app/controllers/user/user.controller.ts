import { Controller, Inject, Post } from '@nestjs/common';
import { Auth } from '../../modules/auth/auth.decorator';
import { RequestWithUser } from '../../modules/model/request-with-user';

export interface CreateUserDataDto {
    username: string;
}

export interface UserDetailDto {
    username: string;
    uid: string;
    email: string;
}

@Controller('user')
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
        const { uid, email } = request.user;
        const user = await this.userRepository.getUserById(uid);
        return {
            uid: user.uid,
            email: user.email,
        };
    }

}
