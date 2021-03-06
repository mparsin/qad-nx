// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: 'EQMS',
  apiUrl: 'http://localhost:55540/api',
  availableEnvironments: [
    {
      name: 'local',
      apiUrl: 'http://localhost:55540/api',
    },
    {
      name: 'oslo-end-user',
      apiUrl: 'https://cont642.qad.com/oslo/rt/EndUser/API/api',
    },
    {
      name: 'oslo-engineering',
      apiUrl: 'https://cont642.qad.com/oslo/rt/Engineering/API/api',
    },
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
