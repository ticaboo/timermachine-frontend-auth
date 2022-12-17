import { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import { TIMERS } from '../pub/topics';
import AddNewTimer from './subcomponents/buttons/AddNewTimer';
import Chrono from './Chrono';
//import ScheduleGroup from './ScheduleGroup';

function PubGroup() {
  const [timers, setTimers] = useState([]);
  const [collapsed] = useState(false);

  // const collapseAll = () => {
  //   setCollapsed(!collapsed);
  // };

  useEffect(() => {
    PubSub.subscribe(TIMERS, (msg, data) => {
      console.log('PubGroup TIMERS:', data);
      setTimers(data);
    });
  });

  return (
    <div className="flex flex-row flex-wrap list-timers">
      PubGroup
      {/* <div>
        <button onClick={collapseAll}>{collapsed ? '+' : '-'}</button>
      </div> */}
      {/* <ScheduleGroup timers={timers} /> */}
      {timers.map((timer, index) => (
        <div key={timer.id} className={` flex flex-col m-2 z-${100 - index}`}>
          <Chrono
            className=""
            key={timer.id}
            singleTimerFlag={false}
            timer={timer}
            timers={timers}
            collapsed={collapsed}
          />
        </div>
      ))}
      <div key="addnewcell010101" className=" flex flex-col m-2 z-0">
        <AddNewTimer />
      </div>
    </div>
  );
}

export default PubGroup;
