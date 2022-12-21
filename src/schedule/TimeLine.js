import './timeline.css';
import React, { useState, useEffect } from 'react';
import { timeToHMformat } from '../Utils';

/*
distil to simplest timeline possible
timestamps: good for ordering.
date field: formatted, guarded (conversion painful - total barf instead of errors)

TODO:
data, test drive,s style.

dates to left *
timer: no stupid box
colors
timer: name, duration
multiple timers (
    O - single
   O O  two
    
    O   - three
   O O

   O O  -four
   O O
)
*/

//map schedules to:

// const timers = {
//   1: { name: 'one' },
//   2: { name: 'two' },
//   3: { name: 'three' }
// };

const exampleData = [
  {
    nextDate: 1670860174640,
    dateFormatted: '08:04',
    timers: [
      { id: '1', name: 'one cool' },
      { id: '2', name: 'two cool' }
    ]
  },
  {
    nextDate: 1670860194640,
    dateFormatted: '08:30',
    timers: [{ id: '1', name: 'three cheese' }]
  }
];

const TimeLine = ({ schedules }) => {
  const [data, setData] = useState(exampleData);
  useEffect(() => {
    //schedules array in date order. {nextDate, id}
    // const res = schedulesToLayoutData();
    // console.log('RES', res);
    // setData(res);
    console.log('timeline schedules', schedules);
  }, [schedules]);

  const schedulesToLayoutData = () => {
    const res = [];
    console.log('input schedules', schedules);
    schedules.forEach((element) => {
      if (typeof res[element.nextDate] === 'undefined') {
        res[element.nextDate] = {
          at: element.nextDate,
          date: timeToHMformat(new Date(element.nextDate)),
          events: [element.id]
        };
      } else {
        res[element.nextDate].events.push(element.id);
      }
    });
    const mapper = data.map((event, index) => {
      return { event };
    });
    console.log('mapper', mapper);
    return res;
  };

  return (
    <div className="vtl">
      {/* {schedules.length} */}
      {schedules.map((schedule, index) => (
        <div className="event" key={index}>
          <p className="date">{schedule.dateFormatted}</p>
          {schedule.timers.map((timer) => (
            <p className="txt">
              {/* <span className="timer-avatar">T</span> */}
              {timer.name}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TimeLine;
