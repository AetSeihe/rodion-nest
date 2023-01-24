import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { FileEntity } from 'src/file/entities/file.entity';
import { FileService } from 'src/file/file.service';
import { UserDTO } from 'src/users/dto/out/user.dto';
import { CreateRouteDto } from './dto/in/create-route.dto';
import { RouteDto } from './dto/out/route.dto';
import { PointEntity } from '../points/entities/point.entity';
import { RouteEntity } from './entities/Route.entity';
import { ROUTE_ENTITY } from './names.entity';
import { DeleteRouteDto } from './dto/in/delete-route.dto';
import { UpdateRouteDto } from './dto/in/update-route.dto';
import { FindRoutesDto } from './dto/in/find-router.dto';
import { Op } from 'sequelize';
import { GetRoutesByCords } from './dto/in/get-by-cords';
import { POINT_ENTITY } from 'src/points/point.providers';

@Injectable()
export class RouteService {
  constructor(
    @Inject(ROUTE_ENTITY) private readonly routeRepository: typeof RouteEntity,
    @Inject(POINT_ENTITY) private readonly pointRepository: typeof PointEntity,

    private readonly fileService: FileService,
  ) {}

  async byCords(data: GetRoutesByCords) {
    const points = await this.pointRepository.findAll({
      include: [RouteEntity],
      where: {
        [Op.and]: [
          {
            lon: {
              [Op.lte]: data.pointStart[0],
            },
            lat: {
              [Op.gte]: data.pointStart[1],
            },
          },
          {
            lon: {
              [Op.gte]: data.pointFinish[0],
            },
            lat: {
              [Op.lte]: data.pointFinish[1],
            },
          },
        ],
      },
    });

    const routes = await this.routeRepository.findAll({
      group: ['id'],
      limit: +data.limit,
      offset: +data.offset,
      where: {
        id: points.map((point) => point.id),
        [Op.or]: [
          {
            hidden: data.hidden,
          },
          {
            hidden: false,
          },
        ],
      },
      attributes: {
        include: [
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM ${PointEntity.tableName} WHERE ${PointEntity.tableName}.routeId=${RouteEntity.name}.id)`,
            ),
            'pointsCount',
          ],
        ],
      },
      include: [
        FileEntity,
        {
          model: PointEntity,
          required: true,
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
        },
      ],
    });

    return routes.map((route) => new RouteDto(route.get()));
  }

  async getAll(data: FindRoutesDto) {
    const routes = await this.routeRepository.findAll({
      group: ['id'],
      limit: +data.limit,
      offset: +data.offset,
      where: {
        [Op.or]: [
          {
            hidden: data.hidden,
          },
          {
            hidden: false,
          },
        ],
        [Op.or]: {
          title: {
            [Op.substring]: data.text,
          },
          description: {
            [Op.substring]: data.text,
          },
        },
      },
      attributes: {
        include: [
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM ${PointEntity.tableName} WHERE ${PointEntity.tableName}.routeId=${RouteEntity.name}.id)`,
            ),
            'pointsCount',
          ],
        ],
      },
      include: [FileEntity],
    });

    return routes.map((route) => new RouteDto(route.get()));
  }

  async create(
    user: UserDTO,
    preview: Express.Multer.File,
    data: CreateRouteDto,
  ) {
    if (!user.isAdmin) {
      throw new HttpException('Отказанно в доступе', HttpStatus.FORBIDDEN);
    }
    const route = this.routeRepository.build({
      ...data,
      creatorId: user.id,
    });

    if (preview) {
      const previewFileEntity = await this.fileService.save(preview);
      route.previewId = previewFileEntity.id;
    }

    const savedRoute = await route.save();

    const currentRoute = await this.routeRepository.findByPk(savedRoute.id, {
      include: FileEntity,
    });

    return new RouteDto(currentRoute.get());
  }

  async delete(user: UserDTO, data: DeleteRouteDto) {
    if (!user.isAdmin) {
      throw new HttpException('Отказанно в доступе', HttpStatus.FORBIDDEN);
    }
    const route = await this.routeRepository.findByPk(data.routeId);

    if (!route) {
      throw new HttpException('Маршрут не найден', HttpStatus.NOT_FOUND);
    }
    await route.destroy();

    return new RouteDto(route.get());
  }

  async update(
    user: UserDTO,
    { routeId, ...data }: UpdateRouteDto,
    preview?: Express.Multer.File,
  ) {
    if (!user.isAdmin) {
      throw new HttpException('Отказанно в доступе', HttpStatus.FORBIDDEN);
    }

    const route = await this.routeRepository.findByPk(routeId);

    if (!route) {
      throw new HttpException('Маршрут не найден', HttpStatus.NOT_FOUND);
    }

    if (preview) {
      const previewFileEntity = await this.fileService.save(preview);
      route.previewId = previewFileEntity.id;
    }

    await route.update(data);
    await route.save();

    const currentRoute = await this.routeRepository.findByPk(route.id, {
      include: FileEntity,
    });

    return new RouteDto(currentRoute.get());
  }
}
