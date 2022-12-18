import React, { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import { TIMERCRU } from '../pub/topics';
import { notifyInPage } from './notifiy';

import { ingestTimer } from './helpers';
import { dataTestAttr, dataTestTagIds } from '../common/tags';
// import Chrono from './Chrono';
/*
  provide buttons to add timer to library.
  eg. on site:  <div class='tolib-button' timer="t=" />
*/
function ToLibButton({ timer, notificationmessage }) {
  const [ingestedTimer, setIngestedTimer] = useState();
  const [label, setLable] = useState('');

  useEffect(() => {
    //check for timer in props as dont want this to look at qs.
    if (timer) {
      const injTimer = ingestTimer(timer);
      // console.log('injTimer', injTimer);
      setIngestedTimer(injTimer);
      setLable(injTimer.timer.name);
    }
    return () => {};
  }, []);

  const timerToLib = () => {
    //TODO: databroker way craddTimer(ingestedTimer);
    setTimeout(() => {
      PubSub.publish(TIMERCRU, ingestedTimer);
    }, 100);
    notifyInPage(notificationmessage, 'Saved Timer to your library');
  };

  return (
    <div>
      <button
        {...dataTestAttr(dataTestTagIds.toLibButton)}
        className="flex align-middle justify-center btn btn-blue btn-outline-primary btn-sm btn-border-radius-lg mt-1 ml-2" /*bootstrap style: btn-outline-success btn-sm */
        onClick={timerToLib}>
        {'+ ' + label}
      </button>
    </div>
  );
}

export default ToLibButton;
