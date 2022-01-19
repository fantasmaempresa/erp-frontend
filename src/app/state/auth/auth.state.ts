import { AuthResponse } from '../../data/models/AuthResponse.model';

export interface AuthState {
  tokens: AuthResponse | null;
}

export const initialState: AuthState = {
  tokens: null,
};
