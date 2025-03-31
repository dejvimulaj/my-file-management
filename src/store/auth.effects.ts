import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map(res => {
            return AuthActions.loginSuccess({
              token: res.accessToken,
              user: res.user
            });
          }),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

    loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap((action) => {
        localStorage.setItem('auth', JSON.stringify({ token: action.token, user: action.user }));
        this.toastService.showToast({
          title: 'Welcome',
          message: 'Login was successful!',
          type: 'success'
        }, 3000);
        this.router.navigate(['/home']);
      })
    ),
    { dispatch: false }
  );


  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      mergeMap(action =>
        this.authService.register(action.email, action.password, action.role).pipe(
          map(res => AuthActions.registerUserSuccess({
            token: res.accessToken,
            user: res.user
          })),
          catchError(error => of(AuthActions.registerUserFailure({ error })))
        )
      )
    )
  );
  
  registerRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUserSuccess),
      tap(() => {
        this.toastService.showToast({
          title: 'Success',
          message: 'You are now registered!',
          type: 'success'
        }, 3000);
        this.router.navigate(['/home']);
      })
    ),
    { dispatch: false }
  );

  errorToast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure, AuthActions.registerUserFailure),
      tap(({ error }) => {
        this.toastService.showToast({
          title: 'Error',
          message: error?.message || 'An error occurred!',
          type: 'error'
        }, 3000);
      })
    ),
    { dispatch: false }
  );
}




