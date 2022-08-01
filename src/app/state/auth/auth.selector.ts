import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { UserAuthDto } from '../../data/dto/UserAuth.dto';
import { UserDto } from '../../data/dto/User.dto';

export const AUTH_STATE_NAME = 'auth';

const selectAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const selectIsAuthenticated = createSelector(selectAuthState, (state) => {
  return !!state.tokens;
});

export const selectIsLoading = createSelector(selectAuthState, (state) => {
  return state.isLoading;
});

export const selectErrorMessage = createSelector(selectAuthState, (state) => {
  return state.errorMessage;
});

export const selectUser = createSelector(selectAuthState, (state) => {
  if (!state.user) {
    return null;
  }
  const user: UserAuthDto = state.user;
  const { role, staff, client, ...userData } = user;
  return userData as unknown as UserDto;
});

export const selectRole = createSelector(selectAuthState, (state) => {
  return state.user?.role;
});
