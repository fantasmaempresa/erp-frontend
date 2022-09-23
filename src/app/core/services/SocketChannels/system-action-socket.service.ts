import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { LaravelWebSocket } from '../../classes/laravel-web-socket';
import { AuthService } from '../auth.service';
import { UserDto } from '../../../data/dto';
import { selectUser } from '../../../state/auth';

@Injectable({
  providedIn: `root`,
})
export class SystemActionSocketService extends LaravelWebSocket {
  private readonly user$: Observable<UserDto | null>;

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router,
  ) {
    super();
    this.subscribeToChannel('system-actions', 'SystemActionsEvent');
    this.user$ = this.store.select(selectUser);
  }

  get action$(): Observable<any> {
    return this._subject$.asObservable().pipe(
      withLatestFrom(this.user$),
      switchMap(([{ action, user }, currentUser]) => {
        // TODO Debemos cambiar y comprobar el tipo de accion de sistema para realizar algun efecto
        console.log(currentUser, action, user);
        if (currentUser?.id === user.id) {
          this.authService.removeTokens();
          this.router.navigate(['auth']);
        }
        return of(null);
      }),
    );
  }
}
