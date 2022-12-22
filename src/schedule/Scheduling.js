/* ScheduleGroup.js */
import React, { useEffect, useState } from 'react';

import PubSub from 'pubsub-js';
import {
  TIMERS,
  HEARTBEAT,
  SCHEDULE_FIRED,
  SCHEDULES_CHANGED
} from '../pub/topics';

import { getNextSchedules } from './scheduleDataHelper';

/*
  # Scheduling:-  
  subscribes to TIMERS
  filters only with active cron -> scheduledTimers
  scheduleArray:  structured [ts: [timer,,],,,].used to BOTH publish for schedule play events; 
  check scheduleArray for time match at heartbeat, then publish schedule_fire. 
  move now forward, and refresh scheduleArray.
  Also publish active Schedules from Now -subscribed to by TimeLine.
*/

let scheduleArray = [];
const setScheduleArray = (newArr) => {
  scheduleArray = newArr;
};

const Scheduling = () => {
  const [scheduledTimers, setScheduledTimers] = useState([]);
  // const [scheduleArray, setScheduleArray] = useState([]); //breaks timer lib - none get shown!

  useEffect(() => {
    PubSub.subscribe(TIMERS, (msg, data) => {
      console.log('Scheduling recieved TIMERS:', data);
      const filtered = data.filter(
        (timer) => timer.schedule.hasCronPattern && timer.schedule.cronPattern
      );
      console.log('Scheduling', data, filtered);
      setScheduledTimers(filtered);
    });

    PubSub.subscribe(HEARTBEAT, (msg, data) => {
      const beatTime = data.data.expectedTimeNoMS;
      let anyFired = false;
      scheduleArray.forEach((schedule) => {
        //TODO: if negative means it was missed (prob client was asleep). pop up Notifications.
        console.log(schedule.nextDate - beatTime);
        if (schedule.nextDate === beatTime) {
          anyFired = true;
          schedule.timers.forEach((timer) => {
            PubSub.publish(SCHEDULE_FIRED, timer.id);
          });
        }
      });
      if (anyFired === true) {
        //need to give it a second or it will just give the same nextScedule
        setTimeout(() => {
          updateCronSchedules();
        }, 1010);
      }
    });
    return () => {
      PubSub.unsubscribe(TIMERS);
      PubSub.unsubscribe(HEARTBEAT);
    };
  });

  useEffect(() => {
    updateCronSchedules();
  }, [scheduledTimers]);

  const updateCronSchedules = () => {
    //scheduling:
    const mostImmediateNextSceduled = getNextSchedules(1, scheduledTimers);
    setScheduleArray(mostImmediateNextSceduled);
    //TimeLine:
    // const longRangeSchedules = getNextSchedules(100, scheduledTimers);
    // PubSub.publish(SCHEDULES_CHANGED, longRangeSchedules);
    PubSub.publish(SCHEDULES_CHANGED, scheduledTimers);
  };

  // return (
  //   <div className="baseWhite">
  //     Debug info: Cron
  //     <p>Scheduling count: {scheduledTimers.length}</p>
  //     <p>{JSON.stringify(scheduleArray)}</p>
  //   </div>
  // );
};

export default Scheduling;
