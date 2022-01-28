import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

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
