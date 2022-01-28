import { AuthResponse } from '../../data/models/AuthResponse.model';

export interface AuthState {
  tokens: AuthResponse | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  tokens: null,
  isLoading: false,
  errorMessage: null,
};
