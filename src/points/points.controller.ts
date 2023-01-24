import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RequestType } from 'src/types/RequestType';
import { CreatePointDto } from './dto/in/create-point.dto';
import { DeletePointDto } from './dto/in/delete=point.dto';
import { UpdatePointDto } from './dto/in/update-point.dto';
import { PointsService } from './points.service';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Get('/:routeId')
  getAll(@Param('routeId') data: number) {
    console.log('data !!!!', data);
    return this.pointsService.getAllByRouteId(data);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'preview', maxCount: 1 },
      { name: 'icon', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(
    @Request() req: RequestType,
    @UploadedFiles()
    files: {
      preview?: Express.Multer.File[];
      icon?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    },
    @Body() data: CreatePointDto,
  ) {
    return this.pointsService.create(
      req.user,
      data,
      files.preview,
      files.icon,
      files.audio,
    );
  }

  @Put()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'preview', maxCount: 1 },
      { name: 'icon', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  update(
    @Request() req: RequestType,
    files: {
      preview?: Express.Multer.File[];
      icon?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    },
    @Body() data: UpdatePointDto,
  ) {
    return this.pointsService.update(
      req.user,
      data,
      files.preview,
      files.icon,
      files.audio,
    );
  }

  @Delete()
  delete(@Request() req: RequestType, @Body() data: DeletePointDto) {
    return this.pointsService.delete(req.user, data);
  }
}
