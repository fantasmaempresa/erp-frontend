import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { environment } from '../../../environments/environment';
import {
  bufferTime,
  filter,
  map,
  repeatWhen,
  shareReplay,
  Subject,
  take,
  takeUntil,
  tap,
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
    let isStopping = false;

    const source$ = this._notifications$.asObservable().pipe(
      tap(() => {
        if (isStopping) {
          start$.next();
          console.log('Reiniciando el contador');
          isStopping = false;
        }
      }),
      bufferTime(1_000, null, 3),
      filter((data: any) => data.length),
      zipWith(
        timer(0, 15_000).pipe(
          takeUntil(stop$),
          repeatWhen(() => start$),
        ),
      ),
      map(([n]) => n),
      tap((data) => console.log(data)),
      shareReplay(),
    );

    source$
      .pipe(
        bufferTime(15_001),
        tap((data: any) => {
          if (!data.length && !isStopping) {
            stop$.next();
            console.log('Parando el contador');
            isStopping = true;
          }
        }),
      )
      .subscribe();

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
        return { notification: { type: 1, message: `Notification Test ${id}` }, id };
      }),
      take(15),
    );
    generateRandomNotifications$.subscribe((notification: any) => {
      this._notifications$.next(notification);
      // console.log(notification);
    });
  }
}
