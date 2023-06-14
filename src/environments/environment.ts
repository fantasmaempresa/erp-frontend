// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // socket_url: '159.223.133.133',
  socket_url: 'localhost:8000',
  // socket_url: 'notaria4puebla.com.mx',
  socket_port: 6003,
  base_url: 'http://localhost:8000/api',
  // base_url: 'http://159.223.133.133/api',
  client_id: '9745ffe6-38e5-437c-8e03-3fc06538aa93',
  client_secret: 'XOVnpU6cwyA18GcT8KdbrvpAtVYWNFPC0I8IaGxl',
  // base_url: 'http://notaria4puebla.com.mx:7201/api',
  // client_id: '991eded4-f69c-4444-a7a8-a2fdeefa6149',
  // client_secret: 'NFRbQirZHQTPQhY4ZTuWqlKIjG5IO3XV6wbaUJLC',
  grant_type: 'password',
  mix_pusher_app_key: '2221asdf',
  mix_pusher_app_cluster: 'mt1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
