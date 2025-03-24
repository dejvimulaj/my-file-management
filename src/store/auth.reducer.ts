import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  user: { email: string; role: string; id?: number } | null;
  error: any | null;
}

export const initialState: AuthState = {
  token: null,
  user: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, error: null })),
  on(AuthActions.loginSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    token: null,
    user: null,
    error
  })),
  on(AuthActions.registerUser, (state) => ({ ...state, error: null })),
  on(AuthActions.registerUserSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    error: null
  })),
  on(AuthActions.registerUserFailure, (state, { error }) => ({
    ...state,
    token: null,
    user: null,
    error
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    token: null,
    user: null,
    error: null
  }))
);