// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  socket_url: 'localhost:8000',
  socket_port: 6003,
  base_url: 'http://localhost:8000/api',
  client_id: '99be1e47-cf2c-414d-af37-6e4f36389bfa',
  client_secret: 'W7YbjjRBT925fdpAd5BloVm4Sa0cqbZaO2Qn1lbQ',
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
