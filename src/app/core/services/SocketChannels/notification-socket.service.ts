import { Injectable } from '@angular/core';
import { bufferTime, filter, map, Observable, take, timer } from 'rxjs';
import { LaravelWebSocket } from '../../classes/laravel-web-socket';
import { NotificationPopUpDto } from '../../../data/dto';

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService extends LaravelWebSocket {
  constructor() {
    super();
    this.subscribeToChannel('notification', 'NotificationEvent');
    // this.subscribeToChannelTest();
  }

  get notifications$(): Observable<NotificationPopUpDto[]> {
    return this._subject$.asObservable().pipe(
      bufferTime(1_000),
      map((array: any[]) => array.reverse()),
      map(([thirdLast, secondLast, firstLast]) =>
        [thirdLast, secondLast, firstLast].filter((isDefined) => isDefined),
      ),
      filter((data: any) => data?.length),
    );
  }

  subscribeToChannelTest() {
    const generateRandomNotifications$ = timer(5_000, 10).pipe(
      map((count) => {
        const id = new Date().getTime();
        return {
          notification: {
            title: 'Prueba',
            type: 1,
            message: `Notification Test ${count}`,
          },
          id,
          check: false,
        };
      }),
      take(10),
    );
    generateRandomNotifications$.subscribe((notification: any) => {
      this._subject$.next(notification);
    });
  }
}
