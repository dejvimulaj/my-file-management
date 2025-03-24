import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {console.log('AuthEffects constructed, actions$: ', actions$);}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map(res => {
            // The response shape is { accessToken, user: { email, role, id } }
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
}
