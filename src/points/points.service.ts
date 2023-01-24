import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FileEntity } from 'src/file/entities/file.entity';
import { FileService } from 'src/file/file.service';
import { UserDTO } from 'src/users/dto/out/user.dto';
import { CreatePointDto } from './dto/in/create-point.dto';
import { DeletePointDto } from './dto/in/delete=point.dto';
import { UpdatePointDto } from './dto/in/update-point.dto';
import { PointDto } from './dto/out/point.dto';
import { PointEntity } from './entities/point.entity';
import { POINT_ENTITY } from './point.providers';

@Injectable()
export class PointsService {
  constructor(
    @Inject(POINT_ENTITY) private readonly pointRepository: typeof PointEntity,
    private readonly fileService: FileService,
  ) {}

  async getAllByRouteId(routeId: number) {
    const points = await this.pointRepository.findAll({
      where: {
        routeId: +routeId,
      },
      include: [
        {
          model: FileEntity,
          as: 'preview',
        },
        {
          model: FileEntity,
          as: 'icon',
        },
        {
          model: FileEntity,
          as: 'audio',
        },
      ],
    });

    return points.map((point) => new PointDto(point.get()));
  }

  async create(
    user: UserDTO,
    data: CreatePointDto,
    preview?: Express.Multer.File[],
    icon?: Express.Multer.File[],
    audio?: Express.Multer.File[],
  ) {
    if (!user.isAdmin) {
      throw new HttpException('В доступе отказанно', HttpStatus.FORBIDDEN);
    }
    const point = this.pointRepository.build(data);

    if (preview && preview[0]) {
      const fileEntity = await this.fileService.save(preview[0]);
      point.previewId = fileEntity.id;
    }
    if (icon && icon[0]) {
      const fileEntity = await this.fileService.save(icon[0]);
      point.iconId = fileEntity.id;
    }
    if (audio && audio[0]) {
      const fileEntity = await this.fileService.save(audio[0]);
      point.audioId = fileEntity.id;
    }

    const savedPoint = await point.save();

    const currentPoint = await this.pointRepository.findByPk(savedPoint.id, {
      include: [
        {
          model: FileEntity,
          as: 'preview',
        },
        {
          model: FileEntity,
          as: 'icon',
        },
        {
          model: FileEntity,
          as: 'audio',
        },
      ],
    });

    return new PointDto(currentPoint.get());
  }

  async update(
    user: UserDTO,
    { pointId, ...data }: UpdatePointDto,
    preview?: Express.Multer.File[],
    icon?: Express.Multer.File[],
    audio?: Express.Multer.File[],
  ) {
    if (!user.isAdmin) {
      throw new HttpException('В доступе отказанно', HttpStatus.FORBIDDEN);
    }

    const point = await this.pointRepository.findByPk(pointId);

    if (!point) {
      throw new HttpException('Поинт не найден', HttpStatus.NOT_FOUND);
    }

    if (preview && preview[0]) {
      const fileEntity = await this.fileService.save(preview[0]);
      point.previewId = fileEntity.id;
    }
    if (icon && icon[0]) {
      const fileEntity = await this.fileService.save(icon[0]);
      point.iconId = fileEntity.id;
    }
    if (audio && audio[0]) {
      const fileEntity = await this.fileService.save(audio[0]);
      point.audioId = fileEntity.id;
    }

    await point.update(data);
    await point.save();

    const currentPoint = await this.pointRepository.findByPk(point.id, {
      include: [
        {
          model: FileEntity,
          as: 'preview',
        },
        {
          model: FileEntity,
          as: 'icon',
        },
        {
          model: FileEntity,
          as: 'audio',
        },
      ],
    });

    return new PointDto(currentPoint.get());
  }

  async delete(user: UserDTO, data: DeletePointDto) {
    if (!user.isAdmin) {
      throw new HttpException('В доступе отказанно', HttpStatus.FORBIDDEN);
    }

    const point = await this.pointRepository.findByPk(data.pointId);

    if (!point) {
      throw new HttpException('Поинт не найден', HttpStatus.NOT_FOUND);
    }

    await point.destroy();

    return new PointDto(point.get());
  }
}
