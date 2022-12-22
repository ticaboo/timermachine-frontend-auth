/* TimeLine.js */
import React, { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import { SCHEDULES_CHANGED } from '../pub/topics';
import { getNextSchedules } from './scheduleDataHelper';
import './timeline.css';

const TimeLine = () => {
  const [scheduleArray, setScheduleArray] = useState([]);

  useEffect(() => {
    PubSub.subscribe(SCHEDULES_CHANGED, (msg, scheduledTimers) => {
      const numberOfUpcomingSchedleEventsToCalculate = 3;
      const longRangeSchedules = getNextSchedules(
        numberOfUpcomingSchedleEventsToCalculate,
        scheduledTimers
      );
      setScheduleArray(longRangeSchedules);
    });

    return () => {
      PubSub.unsubscribe(SCHEDULES_CHANGED);
    };
  });

  /*
todo: storybook - feel it should be a dumb display component that this sends config to...
*/

  return (
    <div className="baseWhite">
      <div className="vtl">
        {/* {schedules.length} */}
        {scheduleArray.map((schedule, index) => (
          <div className="event" key={index}>
            <p className="date">{schedule.dateFormatted}</p>
            {schedule.timers.map((timer) => (
              <p className="txt" key={timer.id}>
                {/* <span className="timer-avatar">T</span> */}
                {timer.name}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
