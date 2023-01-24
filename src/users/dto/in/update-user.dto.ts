import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import {
  getErrorToPhoneField,
  getErrorToRequiredField,
} from 'src/utils/getErrorToRequiredField';

export class UpdateUserDTO {
  @IsString({
    message: getErrorToRequiredField('ФИО'),
  })
  name: string;

  @IsEmail(
    {},
    {
      message: getErrorToRequiredField('E-mail'),
    },
  )
  email: string;

  @IsPhoneNumber('RU', {
    message: getErrorToPhoneField('Номер телефона'),
  })
  phone: string;

  @IsOptional()
  @IsString({
    message: getErrorToRequiredField('Старый пароль'),
  })
  oldPassword: string;

  @IsOptional()
  @IsString({
    message: getErrorToRequiredField('Новый пароль'),
  })
  newPassword: string;
}
