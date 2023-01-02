/* SettingsBar */
import React from 'react';
import Tabs from './subcomponents/Tabs';
import OnSchedleForm from './TimerForm/OnSchedleForm';
import OnStartForm from './TimerForm/OnStartForm';
import OnDuringForm from './TimerForm/OnDuringForm';
import OnEndForm from './TimerForm/OnEndForm';
import {
  hasScheduleSettings,
  hasOnStartSettings,
  hasIntervalSettings,
  hasOnEndSettings
} from '../logic';
//import ScheduleDisplay from './ScheduleDisplay';

/*
settings bar for nav of start,interval,finish. (default to finish tab open.)
icons
bar spacing, highlight effect/color. possibly tab dividers.
onClick - show matching panel

Tabs - Tab just giving impedence when its a one off not a reusable component.

Todo: Do basics - with Icon Styling - svg direct here.

doing: hasSettings per tab - to style green.
*/

const SettingsBar = ({ timer, timers, activeTab, setActiveTab }) => {
  const dropdownClass = ' absolute top-[-0px] mt-2  w-[200px]  border-solid ';
  const overlaidClass = ' mt-2 border-none';

  return (
    <div
      className={` ${
        activeTab === null ? overlaidClass : dropdownClass
      } -left-[1px] right-[1px]  rounded-b-3xl settingsCard furniture-border `}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
        <div
          className=""
          label="schedule"
          title="schedule"
          contentful={hasScheduleSettings(timer)}>
          <OnSchedleForm name="schedule." timer={timer} timers={timers} />
        </div>
        <div
          className=""
          label="at start"
          title="at start"
          contentful={hasOnStartSettings(timer)}>
          <OnStartForm name="timer." timer={timer} timers={timers} />
        </div>
        <div
          className=""
          label="interval"
          title="interval"
          contentful={hasIntervalSettings(timer)}>
          <OnDuringForm name="interval." />
        </div>
        <div
          className=""
          label="at finish"
          title="at finish"
          contentful={hasOnEndSettings(timer)}>
          {' '}
          <OnEndForm name="timer." timer={timer} timers={timers} />
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsBar;
