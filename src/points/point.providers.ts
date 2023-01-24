import { PointEntity } from './entities/point.entity';

export const POINT_ENTITY = 'POINT_ENTITY';

export const pointsProviders = [
  {
    provide: POINT_ENTITY,
    useValue: PointEntity,
  },
];
