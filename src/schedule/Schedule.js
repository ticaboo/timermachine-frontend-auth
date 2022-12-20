import React, { useEffect } from 'react';
import { useRef } from 'react';
import PubSub from 'pubsub-js';
import { SCHEDULE_FIRED } from '../pub/topics';
import cron from 'cron';

const Schedule = ({ timer }) => {
  const cronJobRef = useRef();

  const fireCron = () => {
    // idea is to getNext dates, limit to today,
    // pub on heartbeat.
    // PubSub.publish(SCHEDULE_FIRED, timer.id);
    // account for app running past midnight - recalc cronfires.
    console.log('firecron NOOP');
  };

  useEffect(() => {
    console.log('schdule loaded', timer.schedule.hasCronPattern);

    cronJobRef.current = new cron.CronJob(
      timer.schedule.cronPattern,
      fireCron,
      null,
      true
    );
    // console.log('nextdates', cronJobRef.current.nextDates(20));
    return () => {
      cronJobRef.current.stop();
      console.log(
        'cron next dates after stop',
        cronJobRef.current.nextDates(3)
      );
      cronJobRef.current = null; //explicity null reference hoping for garbage collection.
    };
  });
  return <></>;
  // <button onClick={singler}>-Fire</button>;
};

export default Schedule;
