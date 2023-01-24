import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { authProviders } from './auth/auth.providers';
import { RouteModule } from './route/route.module';
import { PointsModule } from './points/points.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    UsersModule,
    FileModule,
    AuthModule,
    RouteModule,
    PointsModule,
  ],
  providers: [...authProviders],
})
export class AppModule {}
