import React, { useEffect, useState, useRef } from 'react';
import cron from 'cron';
import PubSub from 'pubsub-js';
import { HEARTBEAT } from '../pub/topics';
import { hmtoTimeToday } from '../Utils';
import useAlerts from '../Use/useAlerts';
import l from '../logging';

/*
  Note: at present empty div rendering component.
  used by Chronos, 
  may combine ScheduleDisplay, 
  adaptable to use in ScheduleGroup as and when impement that.

  TODO: need to store when a timer is done/stale. reason: user reloads browser/if pc sleeps possibly.
*/

const Schedule = ({ timer, handleSchedule }) => {
  const [, setTimeNow] = useState();
  const [alertAt, setAlertAt] = useState();
  //const [active, activeLocal.current = ] = useState(); //so only fires once per day. used? or just activeLocal (ref?)
  const activeLocal = useRef();
  const job = useRef();
  const { sayAloud } = useAlerts(timer);

  var HeartBeatSubscriber = function (msg, data) {
    //console.log(msg, data);
    const now = data.data.expectedTime;
    //stub hard coding initially. configurable later. multiple notifications. or just keep 5 min one for a long time.
    //it should just call tts. eg: 'meditation in five minutes'
    //if timer is running schedule wont be active (not loaded in chronos)
    //- free desired logic behaviour from UI, but scary as this gets more complex.
    // for example if meditating - dont want other notifications - like brushing your teeth in 5 minutes!
    const ttslag = 6000;
    const preNotifications = 20 * 1000 + ttslag; //5 * 60; //10 [5,10] [{h,m,s},...]

    if (activeLocal.current) {
      setTimeNow(now);

      if (now >= alertAt) {
        if (now - alertAt <= 1000) {
          console.log('TRIG SCHED;)');
          if (handleSchedule) handleSchedule();
          activeLocal.current = false;
        } else if (activeLocal.current) {
          // todo: see above.
          // console.log(
          //   'scheduled triggered',
          //   (now - alertAt) / 1000,
          //   'seconds late.'
          // );
        }
      }

      //prenotification:
      //TODO: wierd: triggered every second when timer is manually acitvated.
      if (
        alertAt - preNotifications >= now &&
        alertAt - preNotifications >= now - 900 &&
        false === true /* f===t DISABLED due to above wierd issue for now.*/
      ) {
        // let notificationDuration = '';
        // if (timer.timer.h !== '')
        //   notificationDuration += ` ${timer.timer.h} hours. `;
        // if (timer.timer.m !== '')
        //   notificationDuration += ` ${timer.timer.m} minutes. `;
        // if (timer.timer.s !== '')
        //   notificationDuration += ` ${timer.timer.s} seconds. `;
        // if (
        //   timer.timer.h !== '' ||
        //   timer.timer.m !== '' ||
        //   timer.timer.s !== ''
        // ) {
        //   notificationDuration = 'Today it is for ' + notificationDuration;
        // } else {
        //   notificationDuration = ' with no time limit.';
        // }

        sayAloud(
          `Heres a heads up, ${timer.timer.name} is scheduled to start in. ${
            (preNotifications - ttslag) / 1000
          } seconds.`
        );
      }
    }
  };

  /*
    TODO: 
      alertAt no existe. need to convert h,m to s.
      edge case: app long running - at midnight check schedules and instate for the day.
  */
  useEffect(() => {
    //convenient for testing, fires in N ms from now:
    //setAlertAt(Date.now() + 10000);
    //new Date (today), set Hrs, mins, secs:0, ms: 0

    //give cron precedence:
    if (timer.schedule.hasCronPattern && timer.schedule.cronPattern) {
      if (timer.schedule.cronPattern === 'x * * * * *') {
        /* prevent running every second */
        if (handleSchedule) {
          try {
            const newJob = new cron.CronJob(
              timer.schedule.cronPattern,
              handleSchedule,
              null,
              true
            );
            job.current = newJob;
          } catch {
            l('info', 'invalid cron - live edit can cause');
          }
        }
      }
    } else {
      const alertStamp = hmtoTimeToday(
        timer.schedule.h,
        timer.schedule.m,
        timer.schedule.s,
        timer.schedule.ms
      );
      //console.log('alertStamp from now:', alertStamp - Date.now());
      setAlertAt(alertStamp);
      activeLocal.current = true;
    }
  }, [timer, handleSchedule]);

  useEffect(() => {
    var token = PubSub.subscribe(HEARTBEAT, HeartBeatSubscriber); //cleanup on component destroy

    //on unmount:
    return () => {
      PubSub.unsubscribe(token);
    };
  }); //todo: check works as component mount, dismount without , []

  return (
    <div data-t-schedule className="schedule" data-schedule>
      {/* {active ? 'pending' : 'done'}
      <div>
        {timer.schedule.h}:{timer.schedule.m}
      </div> */}
    </div>
  );
};

export default Schedule;
