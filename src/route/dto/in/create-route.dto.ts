import { IsBooleanString, IsString } from 'class-validator';
import { getErrorToRequiredField } from 'src/utils/getErrorToRequiredField';

export class CreateRouteDto {
  @IsString({
    message: getErrorToRequiredField('title'),
  })
  title: string;

  @IsString({
    message: getErrorToRequiredField('description'),
  })
  description: string;

  @IsBooleanString({
    message: getErrorToRequiredField('hidden'),
  })
  hidden: boolean;
}
