import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
