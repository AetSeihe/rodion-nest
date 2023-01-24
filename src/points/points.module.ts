import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { pointsProviders } from './point.providers';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule],
  providers: [PointsService, ...pointsProviders],
  controllers: [PointsController],
  exports: [...pointsProviders],
})
export class PointsModule {}
