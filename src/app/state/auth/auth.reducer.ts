import { createReducer, on } from '@ngrx/store';
import {
  cleanError,
  cleanLoading,
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from './auth.actions';
import { AuthState, initialState } from './auth.state';

export const authReducer = createReducer(
  initialState,
  on(loginStart, (state): AuthState => {
    return {
      ...state,
      errorMessage: '',
      isLoading: true,
    };
  }),
  on(loginSuccess, (state, action): AuthState => {
    return {
      ...state,
      tokens: action.tokens,
      user: action.user,
      isLoading: false,
      errorMessage: null,
    };
  }),
  on(loginFailure, (state, { isLoading, errorMessage }): AuthState => {
    return {
      ...state,
      isLoading,
      errorMessage,
    };
  }),
  on(logout, (state): AuthState => {
    return {
      ...state,
      tokens: null,
    };
  }),
  on(cleanLoading, (state): AuthState => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(cleanError, (state): AuthState => {
    return {
      ...state,
      errorMessage: null,
    };
  }),
);
