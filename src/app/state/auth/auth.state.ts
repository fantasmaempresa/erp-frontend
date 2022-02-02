import { UserAuthModel } from '../../data/models/UserAuth.model';
import { TokensModel } from '../../data/models/Tokens.model';

export interface AuthState {
  tokens: TokensModel | null;
  user: UserAuthModel | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  tokens: null,
  user: null,
  isLoading: false,
  errorMessage: null,
};
