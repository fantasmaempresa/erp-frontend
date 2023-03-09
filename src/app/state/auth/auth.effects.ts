import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginFailure, loginStart, loginSuccess, logout } from './auth.actions';
import { catchError, delay, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TokensDto } from '../../data/dto/Tokens.dto';
import { RoleService } from '../../data/services';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap(({ username, password }) => {
        return this.authService.login(username, password).pipe(
          map((resp) => {
            const tokens: TokensDto = {
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
            return of(
              loginFailure({
                isLoading: false,
                errorMessage: 'Credenciales invalidas',
              }),
            );
          }),
        );
      }),
    );
  });
  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        switchMap(() => this.roleService.buildSidebar()),
        delay(100),
        tap(() => {
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
        map(async () => {
          this.authService.logout();
          await this.router.navigate(['auth']);
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private roleService: RoleService,
    private store: Store,
  ) {}
}
