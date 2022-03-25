import { Injectable } from '@angular/core';
import { LaravelWebSocket } from '../../classes/laravel-web-socket';

@Injectable({
  providedIn: `root`,
})
export class SystemActionSocketService extends LaravelWebSocket {
  constructor() {
    super();
    this.subscribeToChannel('system-action', 'SystemActionEvent');
  }
}
