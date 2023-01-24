import { FileEntity } from './entities/file.entity';
import { FILE_ENTITY } from './names.entity';

export const fileProviders = [
  {
    provide: FILE_ENTITY,
    useValue: FileEntity,
  },
];
