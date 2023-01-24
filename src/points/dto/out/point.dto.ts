import { Transform } from 'class-transformer';
import { FileEntity } from 'src/file/entities/file.entity';

export class PointDto {
  constructor(partial: Partial<PointDto>) {
    Object.assign(this, partial);
  }
  order: number;
  title: string;
  lon: number;
  lat: number;
  previewId: number;
  routeId: number;
  hidden: boolean;

  @Transform(({ value }) => (value ? value.get() : null))
  preview: FileEntity;

  @Transform(({ value }) => (value ? value.get() : null))
  icon: FileEntity;

  @Transform(({ value }) => (value ? value.get() : null))
  audio: FileEntity;
}
