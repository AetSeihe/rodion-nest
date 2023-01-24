import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  modelName: 'file',
  paranoid: true,
})
export class FileEntity extends Model<FileEntity> {
  @Column
  name: string;

  @Column
  originalName: string;

  @Column
  mimetype: string;
}
