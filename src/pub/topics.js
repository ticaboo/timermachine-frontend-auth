/*
Dictionary of pubsub topics


usage example:

import PubSub from 'pubsub-js';
import topics from '../pub/topics'
PubSub.publish(topics.HEARTBEAT, message);
subscriberFn = () =>{}
var token = PubSub.subscribe(topics.HEARTBEAT, subscriberFn);
  useEffect(() => {
   //mout stuff
    return () => {
      //dismount stuff
      PubSub.unsubscribe(token);
    };
  }, []);

 benefits:
 possible improvements: document/hit/enforce message types of publications/subscriptions.
*/

// Topics which are not backed with data storage/memory
export const HEARTBEAT = 'HEARTBEAT';
export const VIDEO_ID = 'VIDEO_ID';
export const VIDEO_PLAY = 'VIDEO_PLAY';
export const VIDEO_PLAYER_CURRENT = 'VIDEO_PLAYER_CURRENT';
export const SCHEDULE_FIRED = Symbol('SCHEDULE_FIRED');
export const SCHEDULES_CHANGED = Symbol('SCHEDULES_CHANGED'); //sheduling emits, timeline subscribes

//timers Data Brokered with local storage
export const TIMERS = 'TIMERS';
export const TIMERCRU = 'TIMERCRU'; //Create or Upda
export const TIMERADDNEW = 'TIMERADDNEW'; //Add new based on default item opti
export const TIMERDELETE = 'TIMERDELETE';
export const TIMERCLONEINPLACE = 'TIMERCLONEINPLACE';

//singleTimers Data Brokered with memory storage
export const SINGLE_TIMERS = 'SINGLE_TIMERS';
export const SINGLE_TIMERCRU = 'SINGLE_TIMERCRU'; //Create or Upda
export const SINGLE_TIMERADDNEW = 'SINGLE_TIMERADDNEW'; //Add new based on default item opti
export const SINGLE_TIMERDELETE = 'SINGLE_TIMERDELETE';
export const SINGLE_TIMERCLONEINPLACE = 'SINGLE_TIMERCLONEINPLACE';

//TODO - timer logs Data Brokered with local storage
export const TIMERLOGS = 'TIMERLOGS';
export const TIMERLOGCRU = 'TIMERLOGCRUD';

//BACKTOLIBRARY

//TODO: not used, remove:
//export const TIMERCRADD = 'TIMERCRADD'
// export const LOCAL_STORAGE_UPDATED_EVENT
//   'LOCAL_STORAGE_UPDATED_EVENT'
// );
