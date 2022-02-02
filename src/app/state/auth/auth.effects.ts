import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { autoLogin, loginFailure, loginStart, loginSuccess, logout } from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TokensModel } from '../../data/models/Tokens.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store,
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.username, action.password).pipe(
          map((resp) => {
            const tokens: TokensModel = {
              access_token: resp.access_token,
              refresh_token: resp.refresh_token,
              token_type: resp.token_type,
              expires_in: resp.expires_in,
            };
            const user = resp.user;
            this.authService.storeTokens(tokens);
            return loginSuccess({ tokens, user });
          }),
          catchError(() => {
            return of(loginFailure({ isLoading: false, errorMessage: 'Credenciales invalidas' }));
          }),
        );
      }),
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.router.navigate(['/app']);
        }),
      );
    },
    { dispatch: false },
  );

  autoLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogin),
        map(() => {
          const token = this.authService.getAuthorizationToken();
        }),
      );
    },
    { dispatch: false },
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        map(() => {
          this.authService.logout();
          this.router.navigate(['auth']);
        }),
      );
    },
    { dispatch: false },
  );
}
