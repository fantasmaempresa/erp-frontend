import { TokensDto, UserAuthDto } from '../../data/dto';

export interface AuthState {
  tokens: TokensDto | null;
  user: UserAuthDto | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  tokens: null,
  user: null,
  isLoading: false,
  errorMessage: null,
};
