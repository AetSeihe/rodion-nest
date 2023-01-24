import { Exclude, Transform } from 'class-transformer';
import { FileEntity } from 'src/file/entities/file.entity';

export class UserDTO {
  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial);
  }

  id: number;
  name: string;
  email: string;
  phone: string;

  @Exclude()
  password: string;

  isAdmin: boolean;

  @Transform(({ value }) => (value ? value.get() : null))
  photo: FileEntity | null;
}
