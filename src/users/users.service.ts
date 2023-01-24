import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Op } from 'sequelize';
import { FileEntity } from 'src/file/entities/file.entity';
import { FileService } from 'src/file/file.service';
import { CreateUserDTO } from './dto/in/create-user.dto';
import { UpdateUserDTO } from './dto/in/update-user.dto';
import { CreatedUserDTO } from './dto/out/created-user.dto';
import { UserDTO } from './dto/out/user.dto';
import { UserEntity } from './entities/user.entity';
import { USER_ENTITY } from './names.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_ENTITY) private readonly userRepository: typeof UserEntity,
    private readonly fileService: FileService,
    private jwtService: JwtService,
  ) {}

  async create(
    image: Express.Multer.File,
    data: CreateUserDTO,
  ): Promise<CreatedUserDTO> {
    const [user, created] = await this.userRepository.findOrBuild({
      where: {
        [Op.or]: [{ email: data.email }, { phone: data.phone }],
      },
      include: [FileEntity],
      defaults: data,
    });

    if (!created) {
      throw new HttpException(
        'Пользователь с данным логином или e-mail уже существует',
        HttpStatus.FORBIDDEN,
      );
    }
    if (image) {
      const imageEntity = await this.fileService.save(image);
      user.photoId = imageEntity.id;
    }

    const savedUser = await user.save();

    const currentUser = await this.userRepository.findByPk(savedUser.id, {
      include: [FileEntity],
    });

    const payload = { username: user.name, sub: user.id };
    return new CreatedUserDTO({
      user: new UserDTO(currentUser.get()),
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    });
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findByPk(id, {
      include: [FileEntity],
    });
    if (!user) {
      return null;
    }

    return new UserDTO(user.get());
  }

  async findOneByLogin(login: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({
      include: [FileEntity],
      where: {
        [Op.or]: [{ email: login }, { phone: login }],
      },
    });

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(
    token: UserDTO,
    image: Express.Multer.File,
    { newPassword, oldPassword, ...data }: UpdateUserDTO,
  ) {
    const candidate = await this.userRepository.findOne({
      where: {
        [Op.not]: {
          id: token.id,
        },
        email: data.email,
        phone: data.phone,
      },
    });

    if (candidate) {
      throw new HttpException(
        'Данный логин или e-mail уже занят',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.userRepository.findByPk(token.id, {
      include: [FileEntity],
    });

    if (newPassword && token.password !== oldPassword) {
      throw new HttpException('Неверно введен пароль', HttpStatus.FORBIDDEN);
    } else {
      user.password = newPassword;
    }

    if (image) {
      const imageEntity = await this.fileService.save(image);
      user.photoId = imageEntity.id;
    }

    await user.update(data);
    await user.save();

    const currentUser = await this.userRepository.findByPk(user.id, {
      include: [FileEntity],
    });

    return new UserDTO(currentUser.get());
  }
}
