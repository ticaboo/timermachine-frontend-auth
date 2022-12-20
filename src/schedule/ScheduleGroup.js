/* ScheduleGroup.js */
import React, { useEffect, useState } from 'react';
import cron from 'cron';
//import UseScheduler from '../Use/useScheduler';
import { hasHM } from '../Utils';
//import Schedule from './ZZSchedule';
import PubSub from 'pubsub-js';
import { TIMERS, HEARTBEAT, SCHEDULE_FIRED } from '../pub/topics';
import Schedule from './Schedule';

let scheduleArray = [];
const setScheduleArray = (newArr) => {
  scheduleArray = newArr;
};
//let scheduleObj = {};

const ScheduleGroup = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    PubSub.subscribe(TIMERS, (msg, data) => {
      console.log('ScheduleGroup recieved TIMERS:', data);
      const filtered = data.filter(
        (timer) =>
          hasHM(timer.schedule) ||
          (timer.schedule.hasCronPattern && timer.schedule.cronPattern)
      );
      console.log('ScheduleGroup', data, filtered);
      setSchedules(filtered);
    });

    PubSub.subscribe(HEARTBEAT, (msg, data) => {
      const beatTime = data.data.expectedTimeNoMS;
      let anyFired = false;
      scheduleArray.forEach((schedule) => {
        //TODO: if negative means it was missed. pop up Notifications.
        //console.log(schedule.nextDate[0].ts - beatTime);
        if (schedule.nextDate[0].ts === beatTime) {
          PubSub.publish(SCHEDULE_FIRED, schedule.id);
          anyFired = true;
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

  /*
  when schedules change, recalculate next schedules
  */
  useEffect(() => {
    updateCronSchedules();
  }, [schedules]);

  //TODO: listen to heartbeat, check if fires cronjob.
  //Then recalc schedules.

  const getCron = (timer) => {
    //constructor(cronTime, onTick, onComplete, start, timezone, context, runOnInit, utcOffset, unrefTimeout)
    return new cron.CronJob(
      timer.schedule.cronPattern,
      () => {
        //NOOP : library node-cron erratic in browser (designed for server)
      }, //onTick
      null, //onComplete
      false // active the job to cb to 2nd param fn
      // optional - time zone.
    );
  };

  const updateCronSchedules = () => {
    const nextSchedules = [];
    for (var key in schedules) {
      var job = getCron(schedules[key]);
      nextSchedules.push({
        nextDate: job.nextDates(1),
        id: schedules[key]['id']
      });
    }

    //TODO: sort array by el.ts
    setScheduleArray(nextSchedules);
    console.log('updateCronSchedules', scheduleArray);
  };

  return (
    <div className="baseWhite">
      {scheduleArray.forEach((schedule) => {
        <div>Sch: {schedule.nextDate[0].ts}</div>;
      })}

      {/* {schedules.map((timer) => (
        <div key={timer.id}>
          <Schedule timer={timer} />
        </div>
      ))} */}
    </div>
  );
};

export default ScheduleGroup;
