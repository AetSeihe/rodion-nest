import { Sequelize } from 'sequelize-typescript';
import { FileEntity } from 'src/file/entities/file.entity';
import { PointEntity } from 'src/points/entities/point.entity';
import { RouteEntity } from 'src/route/entities/Route.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        models: [UserEntity, FileEntity, RouteEntity, PointEntity],
      });
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
