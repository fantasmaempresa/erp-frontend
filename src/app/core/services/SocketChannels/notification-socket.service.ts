import { Injectable } from '@angular/core';
import { bufferTime, filter, map, Observable, take, tap, timer } from 'rxjs';
import { LaravelWebSocket } from '../../classes/laravel-web-socket';

// const ANIMATION_TIME = 18_000;

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService extends LaravelWebSocket {
  constructor() {
    super();
    // this.subscribeToChannel('notification', 'NotificationEvent');
    this.subscribeToChannelTest();
  }

  get notifications$(): Observable<any> {
    // const start$ = new Subject<void>();
    // const stop$ = new Subject<void>();
    // const timerSubject$ = new Subject<void>();

    // const timer$ = timerSubject$.asObservable().pipe(
    //   startWith(0),
    //   switchMap(() => timer(0, ANIMATION_TIME)),
    //   throttleTime(ANIMATION_TIME),
    //   distinctUntilChanged(),
    //   tap((data) => console.log('timer ', data)),
    // );

    return this._subject$.asObservable().pipe(
      map((data) => data.notification),
      bufferTime(1_000, null, 3),
      filter((data: any) => data.length),
      // zipWith(timer$),
      // tap((data) => console.log(data)),
      // map(([n]) => n),
      // timeout(ANIMATION_TIME + 1),
      // catchError(() =>
      //   of(null).pipe(
      //     tap(() => {
      //       console.log('Reset timer and buffer');
      //       stop$.next();
      //       start$.next();
      //       timerSubject$.next();
      //     }),
      //   ),
      // ),
      // takeUntil(stop$),
      // repeatWhen(() => start$),
      tap((data) => console.log(data)),
    );
  }

  subscribeToChannelTest() {
    const generateRandomNotifications$ = timer(0, 10).pipe(
      map(() => {
        const id = new Date().getTime();
        return {
          notification: {
            title: 'Prueba',
            type: 1,
            message: `Notification Test ${id}`,
          },
          id,
          check: false,
        };
      }),
      take(10),
    );
    generateRandomNotifications$.subscribe((notification: any) => {
      this._subject$.next(notification);
      console.log(notification);
    });
  }
}
