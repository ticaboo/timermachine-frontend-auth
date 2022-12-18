import {
  LOCAL_STORAGE_TIMER_KEY,
  LOCAL_STORAGE_TIMER_LOGS_KEY
} from '../Use/usEnv';
import PubSubDataBroker from './PubSubDataBroker';

import {
  TIMERS,
  TIMERCRU,
  TIMERADDNEW,
  TIMERDELETE,
  TIMERCLONEINPLACE
} from './topics';

import {
  SINGLE_TIMERS,
  SINGLE_TIMERCRU,
  SINGLE_TIMERADDNEW,
  SINGLE_TIMERDELETE,
  SINGLE_TIMERCLONEINPLACE
} from './topics';

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
    subDeleteItem: TIMERDELETE,
    subTimerCloneInPlace: TIMERCLONEINPLACE
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
    pubUpdatedAll: SINGLE_TIMERS,
    subCrudItem: SINGLE_TIMERCRU,
    subNewDefaultItem: SINGLE_TIMERADDNEW,
    subDeleteItem: SINGLE_TIMERDELETE,
    subTimerCloneInPlace: SINGLE_TIMERCLONEINPLACE
  }
});

const timerLogsData = new PubSubDataBroker({
  localStorageKey: LOCAL_STORAGE_TIMER_LOGS_KEY,
  defaultNewItem: null,
  topics: {
    pubUpdatedAll: TIMERLOGS,
    subCrudItem: TIMERLOGCRU
  }
});

console.log('timersData', timersData);
console.log('timerLogsData', timerLogsData);
console.log('singleTimerData', singleTimerData);

const DataBrokerage = () => {
  return <div>{/* TODO: possible off page render for info purposes */}</div>;
};

export default DataBrokerage;
