/* TimeLine.js */
import React, { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import { SCHEDULES_CHANGED } from '../pub/topics';
import { getNextSchedules } from './scheduleDataHelper';

import TimeLineD from './TimeLineD';

const TimeLine = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    PubSub.subscribe(SCHEDULES_CHANGED, (msg, scheduledTimers) => {
      const numberOfUpcomingSchedleEventsToCalculate = 10;
      const longRangeSchedules = getNextSchedules(
        numberOfUpcomingSchedleEventsToCalculate,
        scheduledTimers
      );
      console.log('longRangeSchedules', longRangeSchedules);
      setSchedules(longRangeSchedules);
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
      <TimeLineD schedules={schedules} />
    </div>
  );
};

export default TimeLine;
