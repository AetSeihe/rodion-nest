import { Controller, Get, Param, Response } from '@nestjs/common';
import { Public } from 'src/metadata/jwt-public';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Public()
  @Get('/:filename')
  getFile(@Response() res, @Param('filename') filename: string) {
    res.sendFile(this.fileService.get(filename));
  }
}
