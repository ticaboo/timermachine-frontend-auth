import { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import {
  TIMERS,
  TIMERCRU,
  TIMERDELETE,
  TIMERCLONEINPLACE
} from '../pub/topics';
import AddNewTimer from './subcomponents/buttons/AddNewTimer';
import Chrono from './Chrono';
import LibContainer from '../common/LibContainer';
import TimeLine from '../schedule/TimeLine';
// import Basic from '../libs/shared-ui/SampleUIComponent';
//import DemoStressTest from './DemoStressTest';

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
        <div
          key={timer.id}
          className={` flex flex-col m-2 `}
          style={{ zIndex: timers.length - index }}>
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
      {/* <div key="addnewcell010101" className=" flex flex-col m-2 z-0"> */}
      {/* <DemoStressTest></DemoStressTest>
        <LibContainer>
       
        </LibContainer>
      */}
      {/* </div> */}
      <LibContainer>
        <AddNewTimer />
      </LibContainer>

      <LibContainer>
        <TimeLine />
      </LibContainer>
      {/* <Basic>Kids</Basic> */}
    </div>
  );
}

export default PubGroup;
