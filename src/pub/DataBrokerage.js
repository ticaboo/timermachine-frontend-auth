
import { LOCAL_STORAGE_TIMER_KEY } from '../Use/usEnv';
import PubSubDataBroker from './PubSubDataBroker'
import { TIMERS, TIMERCRU, TIMERADDNEW, TIMERDELETE } from './topics';
import { TIMERLOGS, TIMERLOGCRU } from './topics';
import { defaultTimer } from '../data/timers';

import React from 'react';
/*
just a place for all dataBrokerage setup. (beats index for organisation)
*/
const timersData = new PubSubDataBroker({
  localStorageKey: LOCAL_STORAGE_TIMER_KEY,
  defaultNewItem: defaultTimer,
  topics: {
    pubUpdatedAll: TIMERS,
    subCrudItem: TIMERCRU,
    subNewDefaultItem: TIMERADDNEW,
    subDeleteItem: TIMERDELETE
  }
});

const timerLogsData = new PubSubDataBroker({
  localStorageKey: 'Lab-timers-log-test',
  defaultNewItem: null,
  topics: {
    pubUpdatedAll: TIMERLOGS,
    subCrudItem: TIMERLOGCRU
  }
});

/*
try out on a page with multiple single timers.
should behave as app currently does. may need more isolation.
*/
const singleTimerData = new PubSubDataBroker({
  //localStorageKey: 'Lab-timers-log-test',
  useMem: true,
  defaultNewItem: null,
  topics: {
    pubUpdatedAll: 'xxx',
    subCrudItem: 'yyy'
  }
});

console.log(timersData);
console.log(timerLogsData);
console.log(singleTimerData);


const DataBrokerage = () => {
  return <div>
    {/* TODO: possible off page render for info purposes */}
  </div>;
};

export default DataBrokerage;
