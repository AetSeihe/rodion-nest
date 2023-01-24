import { IsBooleanString, IsNumberString, IsOptional } from 'class-validator';

export class GetRoutesByCords {
  @IsBooleanString()
  hidden: boolean;

  @IsNumberString()
  limit: number;

  @IsNumberString()
  offset: number;

  @IsNumberString(
    {},
    {
      each: true,
    },
  )
  pointStart: [string, string];

  @IsNumberString(
    {},
    {
      each: true,
    },
  )
  pointFinish: [string, string];
}
