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
    const filtered = timers.filter((timer) => hasHM(timer.schedule));
    setSchedules(() => filtered);
    //console.log(filtered);
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
