import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Login } from './auth.actions';

export interface AuthState extends EntityState<AuthState> {}

export const adapter: EntityAdapter<AuthState> = createEntityAdapter<AuthState>();
export const initialState: AuthState = adapter.getInitialState();

const AuthReducer = createReducer(
  initialState,
  on(Login, (state) => {
    return {
      ...state,
    };
  }),
);
export function authReducer(state = initialState, action: Action) {
  return AuthReducer(state, action);
}
