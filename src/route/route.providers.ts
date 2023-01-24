import { RouteEntity } from './entities/Route.entity';
import { ROUTE_ENTITY } from './names.entity';

export const routeProviders = [
  {
    provide: ROUTE_ENTITY,
    useValue: RouteEntity,
  },
];
