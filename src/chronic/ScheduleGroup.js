import React, { useEffect, useState } from 'react';
//import UseScheduler from '../Use/useScheduler';
import { hasHM } from '../Utils';
import Schedule from './Schedule';

const ScheduleGroup = ({ timers }) => {
  //const { timers } = UseStorage();
  const [schedules, setSchedules] = useState([]);
  //get timer that has changed.
  useEffect(() => {
    // console.log('timers changed detected in schedule group');
    if (timers && timers.length > 0) {
      const filtered = timers.filter(
        (timer) =>
          hasHM(timer.schedule) ||
          (timer.schedule.hasCronPattern && timer.schedule.cronPattern)
      );
      console.log(timers);
      const t1 = timers[0];
      console.log('t1', t1.schedule.hasCronPattern && t1.schedule.cronPattern);
      setSchedules(() => filtered);
      //console.log('scheduled', filtered);
    }
  }, [timers]);

  return (
    <div>
      {schedules.map((timer) => (
        <div key={timer.id}>
          <Schedule timer={timer} />
        </div>
      ))}
    </div>
  );
};

export default ScheduleGroup;
