import { UserAuthDto } from './UserAuth.dto';

export interface AuthResponseDto {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  user: UserAuthDto;
}
