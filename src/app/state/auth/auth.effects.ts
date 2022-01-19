import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess, logout } from './auth.actions';
import { exhaustMap, map, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.username, action.password).pipe(
          map((tokens) => {
            this.authService.storeTokens(tokens);
            return loginSuccess({ tokens });
          }),
        );
      }),
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.router.navigate(['/app']);
        }),
      );
    },
    { dispatch: false },
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['auth']);
        }),
      );
    },
    { dispatch: false },
  );
}
