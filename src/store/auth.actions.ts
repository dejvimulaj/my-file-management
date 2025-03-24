import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; user: { email: string; role: string; id: number } }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

// Register
export const registerUser = createAction(
  '[Auth] Register User',
  props<{ email: string; password: string; role?: string }>()
);

export const registerUserSuccess = createAction(
  '[Auth] Register User Success',
  props<{ token: string; user: { email: string; role: string; id: number } }>()
);

export const registerUserFailure = createAction(
  '[Auth] Register User Failure',
  props<{ error: any }>()
);

// Optionally, logout
export const logout = createAction('[Auth] Logout');
