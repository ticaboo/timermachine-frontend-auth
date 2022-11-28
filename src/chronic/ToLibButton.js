import React, { useState, useEffect, useRef } from 'react';
import useStorage from '../Use/UseTimerStorage'; //'../Use/useMemortStorage';
import { LOCAL_STORAGE_TIMER_KEY } from '../Use/usEnv';
import PubSub from 'pubsub-js';
import { LOCAL_STORAGE_UPDATED_EVENT } from '../pub/topics';
import { notifyInPage } from './notifiy';

import { ingestTimer } from './helpers';
// import Chrono from './Chrono';
/*
  provide buttons to add timer to library.
  eg. on site:  <div class='tolib-button' timer="t=" />
*/
function ToLibButton({ timer, notificationmessage }) {
  const { craddTimer } = useStorage({ key: LOCAL_STORAGE_TIMER_KEY });
  const [ingestedTimer, setIngestedTimer] = useState();
  const [label, setLable] = useState('');

  useEffect(() => {
    //check for timer in props as dont want this to look at qs.
    if (timer) {
      const injTimer = ingestTimer(timer);
      setIngestedTimer(injTimer);
      setLable(injTimer.timer.name);
    }
    return () => {};
  }, []);

  const timerToLib = () => {
    craddTimer(ingestedTimer);
    setTimeout(() => {
      PubSub.publish(LOCAL_STORAGE_UPDATED_EVENT, LOCAL_STORAGE_TIMER_KEY);
    }, 100);
    notifyInPage(notificationmessage, 'Saved Timer to your library');
  };

  return (
    <div>
      <button
        className="flex align-middle justify-center btn btn-blue btn-outline-primary btn-sm btn-border-radius-lg mt-1 ml-2" /*bootstrap style: btn-outline-success btn-sm */
        onClick={timerToLib}>
        {'+ ' + label}
      </button>
    </div>
  );
}

export default ToLibButton;
