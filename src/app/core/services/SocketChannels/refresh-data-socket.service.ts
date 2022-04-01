import { Injectable } from '@angular/core';
import { LaravelWebSocket } from '../../classes/laravel-web-socket';
import { Observable, pluck, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshDataSocketService extends LaravelWebSocket {
  constructor() {
    super();
    this.subscribeToChannel('refresh-users', 'RefreshDataEvent');
  }

  get userStatus$(): Observable<any> {
    return this._subject$.asObservable().pipe(
      pluck('data'),
      tap((data) => console.log(data)),
    );
  }
}
