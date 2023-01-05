import React from 'react';
import './timeline.css';
import PropTypes from 'prop-types';
//import { dataTestAttr, dataTestTagIds } from '../common/tags';

const TimeLineD = ({ schedules }) => {
  return (
    <div className="baseWhite timeline">
      <div className="vtl" data-test-time-line>
        {/* {schedules.length} */}
        {schedules.map((schedule, index) => (
          <div className="event" key={index} data-test-time-line-event>
            <span className="date" data-test-time-line-date>
              {schedule.dateFormatted}
            </span>
            <ul className="comma-list txt">
              {schedule.timers.map((timer) => (
                <li className="txt" key={timer.id} data-test-time-line-timer>
                  {/* <span className="timer-avatar">T</span> */}
                  {timer.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

TimeLineD.propTypes = {
  schedules: PropTypes.array //todo: define structure ala TypeScript
};

export default TimeLineD;
