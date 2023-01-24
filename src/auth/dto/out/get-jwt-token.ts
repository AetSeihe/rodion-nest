import { UserDTO } from 'src/users/dto/out/user.dto';

export class GetJwtToken {
  user: UserDTO;
  access_token: string;
}
