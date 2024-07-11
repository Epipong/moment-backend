import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersRepository } from 'src/repositories/users.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersRepository],
  imports: [PrismaModule],
  exports: [AuthService],
})
export class AuthModule {}
