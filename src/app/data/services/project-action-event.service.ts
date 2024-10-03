import { Injectable } from '@angular/core';
import { Observable, pluck, tap } from 'rxjs';
import { LaravelWebSocket } from 'src/app/core/classes/laravel-web-socket';
import Pusher from 'pusher-js';


@Injectable({
  providedIn: 'root'
})
export class ProjectActionEventService extends LaravelWebSocket{

  constructor() {
    super();
    this.subscribeToChannel('project-actions', 'ProjectActionsEvent');
  }

  get action$(): Observable<any> {
    return this._subject$.asObservable();
  }

 
}
