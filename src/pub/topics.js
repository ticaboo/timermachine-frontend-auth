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

export const HEARTBEAT = Symbol('HEARTBEAT');
export const VIDEO_ID = Symbol('VIDEO_ID');
export const VIDEO_PLAY = Symbol('VIDEO_PLAY');
export const VIDEO_PLAYER_CURRENT = Symbol('VIDEO_PLAYER_CURRENT');

export const TIMERS = Symbol('TIMERS');
export const TIMERCRU = Symbol('TIMERCRU');//Create or Update
export const TIMERADDNEW = Symbol('TIMERADDNEW');//Add new based on default item option
export const TIMERDELETE = Symbol('TIMERDELETE');

export const TIMERLOGS = Symbol('TIMERLOGS');
export const TIMERLOGCRUD = Symbol('TIMERLOGCRUD');

//TODO: SINGLE TIMER TOPICS?...

//TODO: not used, remove:
export const TIMERCRADD = Symbol('TIMERCRADD');
export const LOCAL_STORAGE_UPDATED_EVENT = Symbol(
  'LOCAL_STORAGE_UPDATED_EVENT') 
