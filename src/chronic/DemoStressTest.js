import React, { useState } from 'react';

import uuid from 'uuid';
//import { stressDemoTimer } from '../data/timers';

import Chrono from './Chrono';
import { dateTohms } from '../Utils';
//import useMemStorage from '../Use/UseMemStorage';
/*
 Demonstrate creating lots (and i mean lots of timers)
*/
function DemoStressTest() {
  const [generateCount, setGenerateCount] = useState(100);

  //temp:
  const timers = [];
  const batchAdd = () => {
    console.log('batchAdd, todo pub');
  };
  const duplicateTimer = () => {};
  const craddTimer = () => {};
  const addNewTimer = () => {};
  const removeTimer = () => {};
  //TODO pub: replace useMemStorage
  // const {
  //   timers,
  //   duplicateTimer,
  //   craddTimer,
  //   addNewTimer,
  //   removeTimer,
  //   batchAdd
  // } = useMemStorage({ storeMem: true, defaultData: stressDemoTimer }); //({ key: 'timersv1stresstesttemp', defaulttimers: timerInject }); //({ useMem: true });

  const changeGenerateCount = (event) => {
    console.log(event);
    setGenerateCount(event.target.value);
  };

  const generateTimers = () => {
    const targetTimers = [];
    const timerInject = { ...timers[0] };
    const schedule = dateTohms();
    timerInject.schedule = schedule;

    for (var i = 1; i <= generateCount; i++) {
      const timerInject = JSON.parse(JSON.stringify(timers[0]));
      timerInject.schedule = { ...schedule };
      timerInject.timer.name = timerInject.timer.name + ' ' + i;
      timerInject.timer.s = 20;
      // timerInject.timer.hasStartAlert = true;
      // timerInject.timer.startAlert = '3';
      // timerInject.timer.hasAlert = true;
      // timerInject.timer.alert = '4';
      timerInject.schedule.s += 1 + i;
      timerInject.schedule.ms = 0; //i * 50;

      timerInject.id = uuid.v4();
      targetTimers.push(timerInject);
    }

    batchAdd(targetTimers);
  };

  return (
    <div className="flex flex-row mt-2 flex-wrap list-timers single-timer baseWhite ">
      <div
        className={`flex baseBlack baseWhite baseCard  w-[200px]  rounded-3xl furniture-border mt-2 mx-2 text-xs`}>
        <div className="ml-2 mt-2 pl-3  h-[190px] ">
          <div className="text-xs p-2">
            Generate button schedules 100s of timers cloned from the one here.
            Change it, hit the button. Now a warining! With 100 alarms going off
            at once - you might want to refresh the browser to end it!
          </div>

          <div className="flex justify-between items-center mr-2  ">
            <button
              className="flex align-middle justify-center btn btn-blue btn-outline-success btn-sm mt-1 ml-6" /*bootstrap style: btn-outline-success btn-sm */
              onClick={generateTimers}>
              Generate
            </button>
            <input
              className="baseCell w-8 mr-2"
              type="text"
              value={generateCount}
              onChange={changeGenerateCount}
            />
          </div>
        </div>
      </div>
      {timers.map((timer) => (
        <div key={timer.id} className=" flex flex-col m-2 ">
          <Chrono
            className=""
            key={timer.id} /* single Timer/new: no id (not stored yet) */
            singleTimerFlag={true} /* todo : concept on way out styling?*/
            timer={timer}
            removeTimer={removeTimer}
            craddTimer={craddTimer}
            duplicateTimer={duplicateTimer}
            addNewTimer={addNewTimer}
            timers={timers}
          />
        </div>
      ))}
    </div>
  );
}

export default DemoStressTest;
