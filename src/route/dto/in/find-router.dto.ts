import { IsBooleanString, IsNumberString, IsString } from 'class-validator';
import { getErrorToRequiredField } from 'src/utils/getErrorToRequiredField';

export class FindRoutesDto {
  @IsNumberString(
    {},
    {
      message: getErrorToRequiredField('limit'),
    },
  )
  limit: number;

  @IsNumberString(
    {},
    {
      message: getErrorToRequiredField('offset'),
    },
  )
  offset: number;

  @IsString({
    message: getErrorToRequiredField('text'),
  })
  text: string;

  @IsBooleanString({
    message: getErrorToRequiredField('hidden'),
  })
  hidden: boolean;
}
