import { IsNumberString, IsString } from 'class-validator';
import { getErrorToRequiredField } from 'src/utils/getErrorToRequiredField';

export class UpdateRouteDto {
  @IsNumberString(
    {},
    {
      message: getErrorToRequiredField('routeId'),
    },
  )
  routeId: number;

  @IsString({
    message: getErrorToRequiredField('title'),
  })
  title: string;

  @IsString({
    message: getErrorToRequiredField('description'),
  })
  description: string;

  @IsString({
    message: getErrorToRequiredField('hidden'),
  })
  hidden: boolean;
}
