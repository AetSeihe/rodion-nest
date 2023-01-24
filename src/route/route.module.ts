import { Module } from '@nestjs/common';
import { FileModule } from 'src/file/file.module';
import { PointsModule } from 'src/points/points.module';
import { RouteController } from './route.controller';
import { routeProviders } from './route.providers';
import { RouteService } from './route.service';

@Module({
  imports: [FileModule, PointsModule],
  controllers: [RouteController],
  providers: [RouteService, ...routeProviders],
})
export class RouteModule {}
