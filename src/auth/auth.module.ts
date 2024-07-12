import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/repositories/users.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService, UsersRepository],
  imports: [PrismaModule],
  exports: [AuthService],
})
export class AuthModule {}
