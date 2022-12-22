import { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import {
  TIMERS,
  TIMERCRU,
  TIMERDELETE,
  TIMERCLONEINPLACE
} from '../pub/topics';
import AddNewTimer from './subcomponents/buttons/AddNewTimer';
import TimeLine from '../schedule/TimeLine';
import Chrono from './Chrono';

function PubGroup() {
  const [timers, setTimers] = useState([]);
  const [collapsed] = useState(false);

  // const collapseAll = () => {
  //   setCollapsed(!collapsed);
  // };

  useEffect(() => {
    PubSub.subscribe(TIMERS, (msg, data) => {
      console.log('PubGroup recieved TIMERS:', data);
      setTimers(data);
    });
    return () => {
      PubSub.unsubscribe(TIMERS);
    };
  });

  return (
    <div className="flex flex-row flex-wrap list-timers">
      {/* <div>
        <button onClick={collapseAll}>{collapsed ? '+' : '-'}</button>
      </div> */}
      {timers.map((timer, index) => (
        <div key={timer.id} className={` flex flex-col m-2 z-${100 - index}`}>
          {/* <div className="baseWhite">PubGroup</div> */}
          <Chrono
            className=""
            key={timer.id}
            singleTimerFlag={false}
            timer={timer}
            timers={timers}
            collapsed={collapsed}
            removeTimer={TIMERDELETE}
            craddTimer={TIMERCRU}
            duplicateTimer={TIMERCLONEINPLACE}
          />
        </div>
      ))}
      <div key="addnewcell010101" className=" flex flex-col m-2 z-0">
        <AddNewTimer />
        <TimeLine />
      </div>
    </div>
  );
}

export default PubGroup;
