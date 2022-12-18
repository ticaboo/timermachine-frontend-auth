import { useState } from 'react';

import AddNewTimer from './subcomponents/buttons/AddNewTimer';
import Chrono from './Chrono';
//import ScheduleGroup from './ScheduleGroup';
import useStorage from '../Use/UseTimerStorage';
import { LOCAL_STORAGE_TIMER_KEY } from '../Use/usEnv';
import { defaultTimer } from '../data/timers';

function TimerGroup() {
  const [collapsed] = useState(false);

  const { timers, duplicateTimer, craddTimer, addNewTimer, removeTimer } =
    useStorage({ key: LOCAL_STORAGE_TIMER_KEY, defaultData: defaultTimer });

  // const collapseAll = () => {
  //   setCollapsed(!collapsed);
  // };
  return (
    <div className="flex flex-row flex-wrap list-timers">
      {/* <div>
        <button onClick={collapseAll}>{collapsed ? '+' : '-'}</button>
      </div> */}
      {/* <ScheduleGroup timers={timers} /> */}
      {timers.map((timer, index) => (
        <div key={timer.id} className={` flex flex-col m-2 z-${100 - index}`}>
          <Chrono
            className=""
            key={timer.id} /* single Timer/new: no id (not stored yet)*/
            singleTimerFlag={false}
            timer={timer}
            removeTimer={removeTimer}
            craddTimer={craddTimer}
            duplicateTimer={duplicateTimer}
            timers={timers}
            collapsed={collapsed}
          />
        </div>
      ))}
      <div key="addnewcell010101" className=" flex flex-col m-2 z-0">
        <AddNewTimer addNewTimer={addNewTimer} />
      </div>
    </div>
  );
}

export default TimerGroup;
