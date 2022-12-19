import React, { useEffect } from 'react';
import { useRef } from 'react';
import PubSub from 'pubsub-js';
import { SCHEDULE_FIRED } from '../pub/topics';
import cron from 'cron';

const Schedule = ({ timer }) => {
  const cronJobRef = useRef();
  const clickTimeout = useRef(null);
  const fireCron = () => {
    PubSub.publish(SCHEDULE_FIRED, timer.id);
    return () => {};
  };

  useEffect(() => {
    console.log('schdule loaded', timer.schedule.hasCronPattern);

    cronJobRef.current = new cron.CronJob(
      timer.schedule.cronPattern,
      fireCron,
      null,
      true
    );
    console.log('nextdates', cronJobRef.current.nextDates(20));
    return () => {
      cronJobRef.current.stop();
    };
  });
  return <></>;
  // <button onClick={singler}>-Fire</button>;
};

export default Schedule;
