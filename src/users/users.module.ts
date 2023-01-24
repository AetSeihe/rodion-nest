import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FileModule } from 'src/file/file.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  imports: [FileModule, JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
