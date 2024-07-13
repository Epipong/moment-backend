import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { UsersModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule],
  controllers: [AuthController],
  providers: [JwtService],
})
export class AppModule {}
