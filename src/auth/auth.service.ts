import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CredentialDto, RegisterDto } from './dto/credential.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  private readonly saltRounds = 10;

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
   * Register a new user.
   * @param username user name
   * @param password password
   * @returns {Promise<User>} the registered user
   */
  public async register(credential: RegisterDto): Promise<User> {
    const { username, password, repeatPassword } = credential;
    this.checkPasswordEqual(password, repeatPassword);

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
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
    return {
      access_token: '',
    };
  }
}
