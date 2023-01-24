import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestType } from 'src/types/RequestType';
import { CreateRouteDto } from './dto/in/create-route.dto';
import { DeleteRouteDto } from './dto/in/delete-route.dto';
import { FindRoutesDto } from './dto/in/find-router.dto';
import { GetRoutesByCords } from './dto/in/get-by-cords';
import { UpdateRouteDto } from './dto/in/update-route.dto';
import { RouteService } from './route.service';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get()
  find(@Query() data: FindRoutesDto) {
    return this.routeService.getAll(data);
  }

  @Get('/by-cords')
  async byCords(@Query() data: GetRoutesByCords) {
    console.log(JSON.stringify(data, null, 2));
    const res = await this.routeService.byCords(data);
    console.log(JSON.stringify(res, null, 2));
    return res;
  }

  @UseInterceptors(FileInterceptor('preview'))
  @Post()
  create(
    @Request() req: RequestType,
    @UploadedFile() preview: Express.Multer.File,
    @Body() data: CreateRouteDto,
  ) {
    return this.routeService.create(req.user, preview, data);
  }

  @UseInterceptors(FileInterceptor('preview'))
  @Put()
  update(
    @Request() req: RequestType,
    @UploadedFile() preview: Express.Multer.File,
    @Body() data: UpdateRouteDto,
  ) {
    return this.routeService.update(req.user, data, preview);
  }

  @Delete()
  delete(@Request() req: RequestType, @Body() data: DeleteRouteDto) {
    return this.routeService.delete(req.user, data);
  }
}
