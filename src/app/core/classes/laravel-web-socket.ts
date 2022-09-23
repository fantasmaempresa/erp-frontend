import Echo from 'laravel-echo';
import { Subject } from 'rxjs';
import { Channel } from 'laravel-echo/dist/channel';
import { environment } from '../../../environments/environment';

export abstract class LaravelWebSocket {
  protected echo!: Echo;

  protected channel!: Channel;

  protected _subject$!: Subject<any>;

  protected constructor() {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: environment.mix_pusher_app_key,
      cluster: environment.mix_pusher_app_cluster,
      forceTLS: false,
      wsHost: environment.socket_url,
      wsPort: environment.socket_port,
      wssPort: environment.socket_port,
      authEndpoint: 'broadcasting/auth',
    });
  }

  subscribeToChannel(channel: string, event: string) {
    if (!this.channel) {
      this.channel = this.echo.channel(channel);
      this._subject$ = new Subject<any>();
      this.channel.listen(event, (data: any) => {
        this._subject$.next(data);
      });
    }
  }

  unsubscribeToChannel(): void {
    this.channel.stopListening('notification', () => {
      this._subject$.complete();
    });
  }
}
