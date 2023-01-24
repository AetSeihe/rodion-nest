import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import {
  getErrorToPhoneField,
  getErrorToRequiredField,
} from 'src/utils/getErrorToRequiredField';

export class CreateUserDTO {
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

  @IsString({
    message: getErrorToRequiredField('Пароль'),
  })
  password: string;
}
