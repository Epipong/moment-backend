import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CredentialDto } from './dto/credential.dto';

@Injectable()
export class AuthService {
  constructor(private primaService: PrismaService) {}

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
    const userCreated = await this.primaService.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return userCreated;
  }
}
