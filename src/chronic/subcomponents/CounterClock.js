import React, { useState, useEffect } from 'react';
import { secondsToTime } from '../../Utils';
import { dataTestAttr, dataTestTagIds } from '../../common/tags';
/*
note:
issue - dynamically change style. 
tried to adjust size on props size, secondsize. JSX no likey.
going children route. fuck it. quick easy win - better than 2 clock components? i think.
at least organising like this - in same component make issue clearer & easier to refactor me tinks.
*/
export const Clock = ({ seconds }) => {
  const [hms, setHms] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    setHms(secondsToTime(Math.abs(seconds)));
  }, [setHms, seconds]);
  return (
    <div className="mb-[10px] " {...dataTestAttr(dataTestTagIds.counterclock)}>
      <span className="text-5xl">
        {hms.h}:{hms.m}
      </span>
      {/* todo - superscript it up 50% cant fucking do it!!!! i hate css */}
      <span className="text-2xl"> {hms.s}</span>
    </div>
  );
};

export const OverClock = ({ seconds }) => {
  const [hms, setHms] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    setHms(secondsToTime(Math.abs(seconds)));
  }, [setHms, seconds]);
  return (
    <div className="mb-1" {...dataTestAttr(dataTestTagIds.counteroverclock)}>
      <span className="text-3xl">
        {' '}
        + {hms.h}:{hms.m}
      </span>
      <span className="text-1xl mb-2"> {hms.s}</span>
    </div>
  );
};
