import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './dto/credential.dto';
import { UsersService } from 'src/users/users.service';
import { comparePasswords, hashPassword } from 'src/utils/password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private checkEmailOrUsernameExist(email: string, username: string) {
    if (!email && !username) {
      throw new BadRequestException(['email or username must be not empty']);
    }
  }

  /**
   * Check if the passwords are equal otherwise it throws a bad request exception.
   * @param password
   * @param repeatPassword
   */
  private checkPasswordEquals(password: string, repeatPassword: string) {
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
  private checkUserExists(users: User[]) {
    if (users.length === 0) {
      throw new NotFoundException('email or username not found');
    }
  }

  /**
   * Check if the password matches with the hashed password.
   * @param password
   * @param hashedPassword
   */
  private async checkPasswordMatches(password: string, hashedPassword: string) {
    const isMatched = await comparePasswords(password, hashedPassword);
    if (!isMatched) {
      throw new BadRequestException('password is invalid');
    }
  }

  /**
   * Get the access token from the payload given.
   * @param payload
   * @returns
   */
  private async getAccessTokenFromPayload(payload: any) {
    return this.jwtService.signAsync(payload, {
      expiresIn: Number(process.env.JWT_EXPIRES_IN),
      secret: process.env.JWT_SECRET,
    });
  }

  /**
   * Register a new user.
   * @param username user name
   * @param password password
   * @returns {Promise<User>} the registered user
   */
  public async register(credential: RegisterDto): Promise<User> {
    const { username, password, repeatPassword, email } = credential;
    this.checkPasswordEquals(password, repeatPassword);

    const hashedPassword = await hashPassword(password);

    return this.usersService.create({
      username,
      password: hashedPassword,
      email,
    });
  }

  /**
   * Login the user.
   * @param credential
   * @returns the access token
   */
  public async login(credential: LoginDto): Promise<{ access_token: string }> {
    const { username, password, email } = credential;
    this.checkEmailOrUsernameExist(email, username);
    const users = await this.usersService.findAll({
      where: { username, email },
    });
    this.checkUserExists(users);
    const user = users[0];
    this.checkPasswordMatches(password, user.password);

    const payload = {
      username: user.username,
      email: user.email,
      id: user.id,
      role: user.role,
    };

    const accessToken = await this.getAccessTokenFromPayload(payload);

    return {
      access_token: accessToken,
    };
  }
}
