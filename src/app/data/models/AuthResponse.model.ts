import { UserAuthModel } from './UserAuth.model';

export interface AuthResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  user: UserAuthModel;
}
