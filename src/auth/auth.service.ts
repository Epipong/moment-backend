import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor() {
    //
  }

  private readonly saltRounds = 10;

  public async register(username: string, password: string) {
    const hashedPassword = bcrypt.hash(password, this.saltRounds);
  }
}
