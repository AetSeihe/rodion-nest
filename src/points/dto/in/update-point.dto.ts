import { IsBooleanString, IsNumberString, IsString } from 'class-validator';
import { getErrorToRequiredField } from 'src/utils/getErrorToRequiredField';

export class UpdatePointDto {
  @IsNumberString(
    {},
    {
      message: getErrorToRequiredField('pointId'),
    },
  )
  pointId: number;

  @IsString({
    message: getErrorToRequiredField('title'),
  })
  title: string;

  @IsString({
    message: getErrorToRequiredField('description'),
  })
  description: string;

  @IsNumberString(
    {},
    {
      message: getErrorToRequiredField('lon'),
    },
  )
  lon: number;

  @IsNumberString(
    {},
    {
      message: getErrorToRequiredField('lat'),
    },
  )
  lat: number;

  @IsNumberString(
    {},
    {
      message: getErrorToRequiredField('order'),
    },
  )
  order: number;

  @IsNumberString(
    {},
    {
      message: getErrorToRequiredField('routeId'),
    },
  )
  routeId: number;

  @IsBooleanString({
    message: getErrorToRequiredField('hidden'),
  })
  hidden: boolean;
}
