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
export const LOCAL_STORAGE_UPDATED_EVENT = Symbol(
  'LOCAL_STORAGE_UPDATED_EVENT'
);
