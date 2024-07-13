import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CredentialDto, RegisterDto } from './dto/credential.dto';
import { UsersService } from 'src/users/users.service';
import { hashPassword } from 'src/utils/password';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * Check if the passwords are equal otherwise it throws a bad request exception.
   * @param password
   * @param repeatPassword
   */
  private checkPasswordEqual(password: string, repeatPassword: string) {
    if (password !== repeatPassword) {
      throw new BadRequestException([
        'repeatPassword must be equal to password',
      ]);
    }
  }

  /**
   * Check if the users array are not empty.
   * @param users
   */
  private checkUserExist(users: User[]) {
    if (users.length === 0) {
      throw new NotFoundException('email not found');
    }
  }

  /**
   * Register a new user.
   * @param username user name
   * @param password password
   * @returns {Promise<User>} the registered user
   */
  public async register(credential: RegisterDto): Promise<User> {
    const { username, password, repeatPassword } = credential;
    this.checkPasswordEqual(password, repeatPassword);

    const hashedPassword = await hashPassword(password);
    const createdUser = await this.usersService.create({
      username,
      password: hashedPassword,
    });
    return createdUser;
  }

  public async login(
    credential: CredentialDto,
  ): Promise<{ access_token: string }> {
    const { username, password } = credential;
    const users = await this.usersService.findAll({ where: { username } });
    this.checkUserExist(users);
    return {
      access_token: '',
    };
  }
}
