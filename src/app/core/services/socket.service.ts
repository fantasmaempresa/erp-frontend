import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  echo!: any;

  constructor(private http: HttpClient) {}

  subscribeToChannel(channelName: string, event: string, cb: any) {
    const echo = new Echo({
      broadcaster: 'pusher',
      key: environment.mix_pusher_app_key,
      cluster: environment.mix_pusher_app_cluster,
      forceTLS: false,
      wsHost: '174.138.49.219',
      wsPort: 6002,
      wssPort: 6002,
      authEndpoint: 'broadcasting/auth',
    });

    console.log(channelName, event);

    let channel = echo.channel(channelName);

    channel.listen(event, (data: any) => {
      cb(data);
    });
  }
}
