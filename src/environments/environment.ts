// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl : 'https://api.spotify.com/v1/',
  client_id : 'abfcca143aa64365b5144943a3a961e3',
  // redirect_uri : 'http://127.0.0.1:3000/authorized'
  redirect_uri : 'https://spotifydemo-3a4a0.firebaseapp.com/authorized'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
