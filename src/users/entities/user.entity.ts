import {
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  IsEmail,
  Model,
  Table,
} from 'sequelize-typescript';
import { FileEntity } from 'src/file/entities/file.entity';

@Table({
  modelName: 'user',
  paranoid: true,
})
export class UserEntity extends Model<UserEntity> {
  @ForeignKey(() => FileEntity)
  @Column
  photoId: number;

  @BelongsTo(() => FileEntity)
  photo: FileEntity;

  @Column
  name: string;

  @IsEmail
  @Column
  email: string;

  @Column
  phone: string;

  @Column
  password: string;

  @Default(false)
  @Column
  isAdmin: boolean;
}
