// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  socket_url: 'localhost:8000',
  socket_port: 6003,
  base_url: 'http://localhost:8000/api',
  client_id: '9a38c8ed-a0c3-4a25-9f37-b5ee3bd05249',
  client_secret: 'pz53tujToyH6VAJrMldjrAz8WmA1zTmyCUlOsZWl',
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
