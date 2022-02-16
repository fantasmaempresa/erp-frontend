import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { environment } from '../../../environments/environment';
import {
  bufferTime,
  catchError,
  filter,
  map,
  of,
  repeatWhen,
  startWith,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  throttleTime,
  timeout,
  timer,
  zipWith,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  echo!: Echo;

  constructor() {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: environment.mix_pusher_app_key,
      cluster: environment.mix_pusher_app_cluster,
      forceTLS: false,
      wsHost: '174.138.49.219',
      wsPort: 6002,
      wssPort: 6002,
      authEndpoint: 'broadcasting/auth',
    });
  }

  private _notifications$ = new Subject<any>();

  get notifications$(): any {
    const start$ = new Subject<void>();
    const stop$ = new Subject<void>();
    const timerSubject$ = new Subject<void>();

    const timer$ = timerSubject$.asObservable().pipe(
      startWith(0),
      switchMap(() => timer(0, 15_000)),
      throttleTime(15_000),
      tap((data) => console.log(data)),
    );

    const source$ = this._notifications$.asObservable().pipe(
      bufferTime(1_000, null, 3),
      filter((data: any) => data.length),
      timeout(15_001),
      catchError(() =>
        of(null).pipe(
          tap(() => {
            console.log('Reset timer and buffer');
            stop$.next();
            start$.next();
            timerSubject$.next();
          }),
        ),
      ),
      takeUntil(stop$),
      repeatWhen(() => start$),
      zipWith(timer$),
      map(([n]) => n),
      tap((data) => console.log(data)),
    );

    return source$;
  }

  subscribeToChannel(channelName: string, event: string) {
    console.log(channelName, event);

    const channel = this.echo.channel(channelName);

    channel.listen(event, (data: any) => {
      this._notifications$.next(data.notification);
    });
  }

  subscribeToChannelTest() {
    const generateRandomNotifications$ = timer(0, 10).pipe(
      map(() => {
        const id = new Date().getTime();
        return { notification: { type: 1, message: `Notification Test ${id}` }, id, check: false };
      }),
      take(5),
    );
    generateRandomNotifications$.subscribe((notification: any) => {
      this._notifications$.next(notification);
      // console.log(notification);
    });
  }
}
