const APP = 'timermahine';
const VERSION = 'v1';

const environment =
  (typeof Cypress).toString() !== 'undefined' ? 'cypress' : ''; //e2e / compoenet etc...
const ROOT = APP + environment + VERSION + '';
console.log('useEnv ROOT:', ROOT);
const LOCAL_STORAGE_TIMER_KEY = ROOT + 'timers';
const LOCAL_STORAGE_TIMER_LOGS_KEY = ROOT + 'timerlogs';

process.env.LOCAL_STORAGE_TIMER_KEY = LOCAL_STORAGE_TIMER_KEY;
process.env.LOCAL_STORAGE_TIMER_LOGS_KEY = LOCAL_STORAGE_TIMER_LOGS_KEY;

export { LOCAL_STORAGE_TIMER_KEY, LOCAL_STORAGE_TIMER_LOGS_KEY };
