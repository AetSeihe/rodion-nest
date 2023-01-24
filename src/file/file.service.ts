import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as fs from 'async-file';
import { resolve } from 'path';
import * as uuid from 'uuid';
import { FileEntity } from './entities/file.entity';
import { FILE_ENTITY } from './names.entity';

@Injectable()
export class FileService {
  constructor(
    @Inject(FILE_ENTITY) private readonly fileRepository: typeof FileEntity,
  ) {}

  get(filename: string) {
    const filePath = resolve(__dirname, '..', 'uploads', filename);
    return filePath;
  }

  async save(file: Express.Multer.File) {
    const fileName = await this.saveFile(file);
    const fileEntity = await this.fileRepository.create({
      name: fileName,
      originalName: file.originalname,
      mimetype: file.mimetype,
    });
    return fileEntity;
  }

  private async saveFile(file: Express.Multer.File) {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = resolve(__dirname, '..', 'uploads');
      const existFile = await fs.exists(filePath);
      if (!existFile) {
        await fs.mkdir(filePath);
      }
      await fs.writeFile(resolve(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
