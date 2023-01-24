import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { fileProviders } from './file.providers';

@Module({
  controllers: [FileController],
  providers: [FileService, ...fileProviders],
  exports: [FileService],
})
export class FileModule {}
