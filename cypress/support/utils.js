import { LOCAL_STORAGE_TIMER_KEY } from '../../src/Use/usEnv';
import { defaultTimer } from '../../src/data/timers';

/*
for now anything that references application code goes here.
could be better, but working out the trade offs of other ways first.
i.e. config, dotenv, json generation.etc
*/

const withDefault = {
  ...defaultTimer,
  ...{
    timer: {
      ...defaultTimer.timer,
      name: 'default',
      s: '1',
      alert: '7',
      hasAnnounce: true,
      announce:
        'test test test your code, though it seems a chore, youll get into the flow of it, and it really makes coding less of a bore!'
    }
  }
};
const withOnEndAlert = {
  ...defaultTimer,
  ...{
    timer: {
      ...defaultTimer.timer,
      name: 'onend alert',
      s: '1',
      hasAlert: true,
      alert: '7'
    }
  }
};
const withOnStartAlert = {
  ...defaultTimer,
  ...{
    timer: {
      ...defaultTimer.timer,
      name: 'onstart alert',
      s: '1',
      hasStartAlert: true,
      startAlert: '7'
    }
  }
};

export const testTimers = {
  raw: [defaultTimer],
  basics: [withDefault, withOnEndAlert, withOnStartAlert]
};

// setLocalStorageTimers(null) wipes db,which is handy :) and dangerous
// takes array of timer objects [{id:...},]
export const setLocalStorageTimers = (timers) => {
  window.localStorage.setItem(LOCAL_STORAGE_TIMER_KEY, JSON.stringify(timers));
};

export const getLocalStorageTimers = () => {
  return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_TIMER_KEY));
};
