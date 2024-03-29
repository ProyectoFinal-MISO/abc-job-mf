// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseUrl: string = 'http://localhost:5000';
const baseUrlUsers: string = 'http://localhost:5000/users';
const baseUrlEvaluations: string = 'http://localhost:5001/evaluations';
const baseUrlProjects: string = 'http://localhost:5002/';
const baseUrlInterviews: string = 'http://localhost:5003/interviews';
const baseUrlMediator: string = 'http://localhost:5004/mediator';

export const environment = {
  production: false,
  baseUrl,
  baseUrlEvaluations,
  baseUrlUsers,
  baseUrlProjects,
  baseUrlInterviews,
  baseUrlMediator,
  sur: 'sur',
  token: 'token',
  mockMode:true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
