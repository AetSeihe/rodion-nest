import { UserDTO } from './user.dto';

export class CreatedUserDTO {
  constructor(partial: Partial<CreatedUserDTO>) {
    Object.assign(this, partial);
  }

  access_token: string;
  user: UserDTO;
}
