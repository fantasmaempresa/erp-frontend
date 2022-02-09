import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';

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

  private _echo$ = new Subject<any>();

  get echo$(): any {
    return this._echo$.asObservable();
  }

  subscribeToChannel(channelName: string, event: string) {
    console.log(channelName, event);

    const channel = this.echo.channel(channelName);

    channel.listen(event, (data: any) => {
      this._echo$.next(data);
    });
  }
}
