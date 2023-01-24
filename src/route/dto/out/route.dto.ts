import { Exclude, Transform } from 'class-transformer';
import { FileEntity } from 'src/file/entities/file.entity';
import { PointDto } from 'src/points/dto/out/point.dto';

export class RouteDto {
  constructor(partial: Partial<RouteDto>) {
    Object.assign(this, partial);
  }

  id: number;
  description: string;
  hidden: boolean;

  creatorId: number;

  @Exclude()
  previewId: number;

  @Transform(({ value }) =>
    value ? value.map((point) => new PointDto(point.get())) : null,
  )
  points: PointDto[];

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  @Transform(({ value }) => (value ? value.get() : null))
  preview: FileEntity | null;
}
