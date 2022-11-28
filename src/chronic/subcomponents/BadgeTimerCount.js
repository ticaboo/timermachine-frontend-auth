import React from 'react';
import { lpad } from '../../Utils';
//import BadgeAnimation from './buttons/BadgeAnimation';

const BadgeTimerCount = ({ completedCount }) => {
  //console.log('badge,completedCount', completedCount);
  return (
    <>
      {!!completedCount && (
        <span
          title="Times completed timer"
          className="min-w-2 text-xs border-2 rounded-full p-1 -ml-1 text-green-500 border-green-500">
          {lpad(completedCount)}
        </span>
      )}
    </>
  );
};

export default BadgeTimerCount;
