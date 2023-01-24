import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { FileEntity } from 'src/file/entities/file.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { PointEntity } from '../../points/entities/point.entity';

@Table({
  modelName: 'route',
  paranoid: true,
})
export class RouteEntity extends Model<RouteEntity> {
  @Column
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column
  hidden: boolean;

  @ForeignKey(() => UserEntity)
  @Column
  creatorId: number;

  @BelongsTo(() => UserEntity)
  creator: UserEntity;

  @ForeignKey(() => FileEntity)
  @Column
  previewId: number;

  @BelongsTo(() => FileEntity)
  preview: FileEntity;

  @HasMany(() => PointEntity)
  points: PointEntity[];
}
