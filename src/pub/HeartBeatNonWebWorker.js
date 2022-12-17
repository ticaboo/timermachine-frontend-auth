import React, { useEffect } from 'react';

import WorkerBuilder from '../workers/worker-builder';
import Worker from '../workers/seconds.worker';
import PubSub from 'pubsub-js';
import { HEARTBEAT } from './topics';

//want one heartbeat webworker ticking away for any/all to listen to.
/*
This is to see if cy.clock() works without webworker.
*/

/*
 on pump up heartbeat, get it as close as possilbe to zero milliseconds (seconds in sync, accurate)
 
*/

/*
    include this hidden component once in application,
    at App/Index level is good
*/
const beat = () => {
  var expected;
  const interval = 1000;

  const init = () => {
    const now = new Date();
    const msOffset = now.getMilliseconds();
    const syncUpMs = 1000 - msOffset;
    //console.log('heartbeat init', { msOffset, syncUpMs });
    expected = now + msOffset;
    setTimeout(() => {
      step(); //get it pumping. matches data shape {now, at}
    }, syncUpMs);
  };

  const step = () => {
    // console.log('.');
    var delta = Date.now() - expected;
    //console.log('heartbeat.', delta);
    if (delta > interval) {
      //   // something really bad happened. Maybe the browser (tab) was inactive? possibly special handling to avoid futile "catch up" run
    }
    //console.log(new Date());
    expected += interval;

    PubSub.publish(HEARTBEAT, {
      data: {
        data: {
          expectedTime: expected,
          actualTime: Date.now(),
          at: new Date()
        }
      }
    });
    setTimeout(step, Math.max(0, interval - delta)); // take into account drift
  };
  return { init };
};

const HeartBeat = () => {
  const beater = beat();
  beater.init();
  return <div data-test-heartbeat className="heart-beat"></div>;
};
export default HeartBeat;
