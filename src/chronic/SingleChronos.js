import React, { useState, useEffect } from 'react';
//import useStorage from '../Use/UseTimerStorage'; //'../Use/useMemortStorage';
import PubSub from 'pubsub-js';
import {
  SINGLE_TIMERS,
  SINGLE_TIMERCRU,
  SINGLE_TIMERDELETE,
  SINGLE_TIMERCLONEINPLACE
  //SINGLE_TIMERADDNEW,
} from '../pub/topics';

import { ingestTimer } from './helpers';
import Chrono from './Chrono';
/*
TODO: MISNOMER: CHANGE name from SingleChronos to singleGroup/ShareGroup/inMemGroup - name will become apparent, and cool when it is born!
as now a group with memoryStorage.
timer(s) can enter here in three ways:

  ingestTimer: (on mount)
    url:qs
    html props
  subscription to singleTimerDataBroker. (so all functions of localStorage Timers avaiiable and backed by in memory data.)

*/
function SingleChronos({ timer }) {
  const [timers, setTimers] = useState([]);

  //TODO PUB: replace timers, etc from useStorage...
  //how to run this once?
  /*
  deep equals?
  if prev state [] dont 
*/

  useEffect(() => {
    const ingestedTimer = ingestTimer(timer);
    PubSub.publish(SINGLE_TIMERCRU, ingestedTimer);
    setTimers([ingestedTimer]);

    setTimeout(() => {
      PubSub.subscribe(
        SINGLE_TIMERS,
        (msg, data) => {
          console.log('PubGroup TIMERS:', data);
          if (timers.length > 0) {
            setTimers(data);
          }
        },
        100
      );
    });
    return () => {
      PubSub.unsubscribe(SINGLE_TIMERS);
    };
  });

  return (
    <div className="flex flex-row flex-wrap list-timers single-timer">
      {timers.map((timer) => (
        <div key={timer.id} className=" flex flex-col m-2 ">
          <Chrono
            className=""
            key={timer.id}
            singleTimerFlag={true}
            timer={timer}
            timers={timers}
            removeTimer={SINGLE_TIMERDELETE}
            craddTimer={SINGLE_TIMERCRU}
            duplicateTimer={SINGLE_TIMERCLONEINPLACE}
          />
        </div>
      ))}
    </div>
  );
}

export default SingleChronos;
