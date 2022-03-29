import { Injectable } from '@angular/core';
import { LaravelWebSocket } from '../../classes/laravel-web-socket';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshDataEventService extends LaravelWebSocket {
  constructor() {
    super();
    this.subscribeToChannel('refresh-clients', 'RefreshDataEvent');
  }

  get userStatus$(): Observable<any> {
    return this._subject$.asObservable().pipe(tap((data) => console.log(data)));
  }
}
