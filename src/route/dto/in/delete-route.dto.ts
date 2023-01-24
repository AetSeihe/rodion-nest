import { IsNumber } from 'class-validator';
import { getErrorToRequiredField } from 'src/utils/getErrorToRequiredField';

export class DeleteRouteDto {
  @IsNumber(
    {},
    {
      message: getErrorToRequiredField('routeId'),
    },
  )
  routeId: number;
}
