import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/metadata/jwt-public';
import { RequestType } from 'src/types/RequestType';
import { CreateUserDTO } from './dto/in/create-user.dto';
import { UpdateUserDTO } from './dto/in/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  async getById(@Param('id') id: number) {
    const user = await this.usersService.findOneById(id);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Public()
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() data: CreateUserDTO,
  ) {
    return this.usersService.create(image, data);
  }

  @UseInterceptors(FileInterceptor('image'))
  @Put()
  update(
    @Request() req: RequestType,
    @UploadedFile() image: Express.Multer.File,
    @Body() data: UpdateUserDTO,
  ) {
    return this.usersService.update(req.user, image, data);
  }
}
