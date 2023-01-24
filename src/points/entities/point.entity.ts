import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { FileEntity } from 'src/file/entities/file.entity';
import { RouteEntity } from '../../route/entities/Route.entity';

@Table({
  modelName: 'point',
  paranoid: true,
})
export class PointEntity extends Model<PointEntity> {
  @Column
  order: number;

  @Column
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.DOUBLE)
  lon: number;

  @Column(DataType.DOUBLE)
  lat: number;

  @ForeignKey(() => FileEntity)
  @Column
  previewId: number;

  @BelongsTo(() => FileEntity, {
    foreignKey: 'previewId',
    as: 'preview',
  })
  preview: FileEntity;

  @ForeignKey(() => FileEntity)
  @Column
  iconId: number;

  @BelongsTo(() => FileEntity, {
    as: 'icon',
    foreignKey: 'iconId',
  })
  icon: FileEntity;

  @ForeignKey(() => FileEntity)
  @Column
  audioId: number;

  @BelongsTo(() => FileEntity, {
    as: 'audio',
    foreignKey: 'audioId',
  })
  audio: FileEntity;

  @ForeignKey(() => RouteEntity)
  @Column
  routeId: number;

  @BelongsTo(() => RouteEntity)
  route: RouteEntity;

  @Column
  hidden: boolean;
}
