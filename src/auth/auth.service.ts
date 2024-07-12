import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CredentialDto } from './dto/credential.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  private readonly saltRounds = 10;

  /**
   * Register a new user.
   * @param username user name
   * @param password password
   * @returns {Promise<User>} the registered user
   */
  public async register(credential: CredentialDto): Promise<User> {
    const { username, password } = credential;
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    const userCreated = await this.usersService.create({
      username,
      password: hashedPassword,
    });
    return userCreated;
  }
}
