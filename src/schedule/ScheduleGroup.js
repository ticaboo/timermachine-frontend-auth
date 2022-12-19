/* ScheduleGroup.js */
import React, { useEffect, useState } from 'react';
//import UseScheduler from '../Use/useScheduler';
import { hasHM } from '../Utils';
//import Schedule from './ZZSchedule';
import PubSub from 'pubsub-js';
import { TIMERS } from '../pub/topics';
import Schedule from './Schedule';

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
    return () => {
      PubSub.unsubscribe(TIMERS);
    };
  });

  return (
    <div className="baseWhite">
      {/* <div>Schedule Group</div> */}
      {schedules.map((timer) => (
        <div key={timer.id}>
          {/* name: {timer.timer.name} */}
          <Schedule timer={timer} />
          {/* <Schedule timer={timer} /> */}
        </div>
      ))}
    </div>
  );
};

export default ScheduleGroup;
