/* ScheduleGroup.js */
import React, { useEffect, useState } from 'react';
import cron from 'cron';
//import UseScheduler from '../Use/useScheduler';
import { hasHM } from '../Utils';
//import Schedule from './ZZSchedule';
import PubSub from 'pubsub-js';
import { TIMERS, HEARTBEAT, SCHEDULE_FIRED } from '../pub/topics';
//import Schedule from './Schedule';
import TimeLine from './TimeLine';
import { timeToHMformat } from '../Utils';

let scheduleArray = [];
const setScheduleArray = (newArr) => {
  scheduleArray = newArr;
};

const ScheduleGroup = () => {
  const [scheduledTimers, setScheduledTimers] = useState([]);

  useEffect(() => {
    PubSub.subscribe(TIMERS, (msg, data) => {
      console.log('ScheduleGroup recieved TIMERS:', data);
      const filtered = data.filter(
        (timer) =>
          hasHM(timer.schedule) ||
          (timer.schedule.hasCronPattern && timer.schedule.cronPattern)
      );
      console.log('ScheduleGroup', data, filtered);
      setScheduledTimers(filtered);
    });

    PubSub.subscribe(HEARTBEAT, (msg, data) => {
      const beatTime = data.data.expectedTimeNoMS;
      let anyFired = false;
      scheduleArray.forEach((schedule) => {
        //TODO: if negative means it was missed. pop up Notifications.
        //console.log(schedule.nextDate- beatTime);
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
  // end useEffect

  /*
  when schedules change, recalculate next schedules
  */
  useEffect(() => {
    updateCronSchedules();
  }, [scheduledTimers]);

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

  /*

  1. schedules to scheduledTimers √
  2. [0].ts X √

[ {nextDate: Array(1), id: '43k5jh345' } ]
3:
to: 
  at: ts,
  timers: [ {{id:'', name: ''}]
  loop timers - one pub for each.
*/

  const updateCronSchedules = () => {
    const nextSchedules = [];

    /*
     fix unsafe: async?
     two pass: 
     -> [ all ts], reduce.
     -> attach timers
    */
    for (var key in scheduledTimers) {
      var job = getCron(scheduledTimers[key]);

      const matchedSchedules = nextSchedules.filter(
        //todo fix: Function declared in a loop contains unsafe references to variable(s) 'job'.eslintno-loop-func
        (schedule) => schedule.nextDate === job.nextDates(1)[0].ts
      );
      if (matchedSchedules.length === 1) {
        //indexof nextScedules where at =  job.. ts found, add timer to it.
        matchedSchedules[0].timers.push({
          id: scheduledTimers[key]['id'],
          name: scheduledTimers[key]['timer']['name']
        });
      } else {
        //new ts
        nextSchedules.push({
          nextDate: job.nextDates(1)[0].ts,
          dateFormatted: timeToHMformat(new Date(job.nextDates(1)[0].ts)),
          timers: [
            {
              id: scheduledTimers[key]['id'],
              name: scheduledTimers[key]['timer']['name']
            }
          ]
        });
      }
    }
    nextSchedules.sort((a, b) => {
      return a.nextDate < b.nextDate;
    });

    setScheduleArray(nextSchedules);
    console.log('updateCronSchedules', scheduleArray);
  };

  return (
    <div className="baseWhite">
      <TimeLine schedules={scheduleArray} />

      {/* {schedules.map((timer) => (
        <div key={timer.id}>
          <Schedule timer={timer} />
        </div>
      ))} */}
    </div>
  );
};

export default ScheduleGroup;
