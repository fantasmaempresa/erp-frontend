import Echo from 'laravel-echo';
import { Subject } from 'rxjs';
import { Channel } from 'laravel-echo/dist/channel';
import { environment } from '../../../environments/environment';

export abstract class LaravelWebSocket {
  protected echo!: Echo;

  protected channel!: Channel;

  protected _subject$ = new Subject<any>();

  protected constructor() {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: environment.mix_pusher_app_key,
      cluster: environment.mix_pusher_app_cluster,
      forceTLS: false,
      wsHost: environment.socket_url,
      wsPort: environment.socket_port,
      // wssPort: environment.socket_port,
      // authEndpoint: 'broadcasting/auth',
    });

    // ws://localhost:6003/app/1234567?protocol=7&client=js&version=4.3.1&flash=false

  }

  subscribeToChannel(channel: string, event: string) {
    if (!this.channel) {
      console.log('escuchando en channel ---> ', channel);
      this.channel = this.echo.channel(channel);
      this._subject$ = new Subject<any>();
      this.channel.listen(event, (data: any) => {
        console.log('llegada de comando en', channel, 'información --> ', data);
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
