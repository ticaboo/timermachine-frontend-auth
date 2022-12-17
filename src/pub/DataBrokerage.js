
import { LOCAL_STORAGE_TIMER_KEY } from '../Use/usEnv';
import PubSubDataBroker from './PubSubDataBroker'
import { defaultTimer } from '../data/timers';

import React from 'react';
/*
just a place for all dataBrokerage setup. (beats index for organisation)
*/
const timersData = new DataBroker({
  localStorageKey: LOCAL_STORAGE_TIMER_KEY,
  defaultNewItem: defaultTimer,
  topics: {
    pubUpdatedAll: TIMERS,
    subCrudItem: TIMERCRUD,
    subNewDefaultItem: TIMERADDNEW,
    subDeleteItem: TIMERDELETE
  }
});

const timerLogsData = new DataBroker({
  localStorageKey: 'Lab-timers-log-test',
  defaultNewItem: null,
  topics: {
    pubUpdatedAll: TIMERLOGS,
    subCrudItem: TIMERLOGCRUD
  }
});

/*
try out on a page with multiple single timers.
should behave as app currently does. may need more isolation.
*/
const singleTimerData = new DataBroker({
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
  const { timers, duplicateTimer, craddTimer, addNewTimer, removeTimer } =
    useStorage({ key: LOCAL_STORAGE_TIMER_KEY, defaultData: defaultTimer });

  return <div></div>;
};

export default DataBrokerage;
