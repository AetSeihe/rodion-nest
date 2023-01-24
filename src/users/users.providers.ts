import { UserEntity } from './entities/user.entity';
import { USER_ENTITY } from './names.entity';

export const usersProviders = [
  {
    provide: USER_ENTITY,
    useValue: UserEntity,
  },
];
