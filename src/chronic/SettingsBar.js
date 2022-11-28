import React from 'react';
import Tabs from './subcomponents/Tabs';
import OnSchedleForm from './TimerForm/OnSchedleForm';
import OnStartForm from './TimerForm/OnStartForm';
import OnDuringForm from './TimerForm/OnDuringForm';
import OnEndForm from './TimerForm/OnEndForm';
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
  const hasScheduleSettings = () => {
    // console.log(
    //   'hasSched',
    //   timer.schedule.h,
    //   timer.schedule.h || timer.schedule.m
    // );
    const hasDAdjust =
      timer.schedule.hasDurationAdjustment &&
      timer.schedule.durationAdjustment.length !== 0;
    return !!(hasDAdjust || (timer.schedule.h && timer.schedule.m));
  };

  const hasOnStartSettings = () => {
    // hasStartAlert: false,
    // startAlert: '',
    // hasStartAnnounce: false,
    // startAnnounce: '',
    // hasStartPlaylist: false,
    // startPlaylist: '',
    // hasPlayDuringUrl: X -unused in default struct: using hasStartPlayUrl in form.
    // playDuringUrl: '',X - same as above: startPlayUrl

    const t = timer.timer;
    const hasAlert = t.hasStartAlert && t.startAlert;
    const hasAnnounce = t.hasStartAnnounce && t.startAnnounce;

    const hasPlaylist = t.hasStartPlaylist && t.startPlaylist;
    const hasURL = t.hasStartPlayUrl && t.startPlayUrl;

    // console.log({
    //   hasAlert,
    //   hasAnnounce,
    //   hasPlaylist,
    //   hasURL
    // });
    return !!(hasAlert || hasAnnounce || hasPlaylist || hasURL);
  };
  const hasIntervalSettings = () => {
    const hasIntervalTime =
      timer.interval.h || timer.interval.m || timer.interval.s;
    const hasEnabledAlert =
      timer.interval.hasAlert || timer.interval.hasAnnounce;
    //console.log('hasInterval', hasIntervalTime && hasEnabledAlert);
    return !!(hasIntervalTime && hasEnabledAlert);
  };
  const hasOnEndSettings = () => {
    const t = timer.timer;
    const hasAlert = t.hasAlert && t.alert;
    const hasAnnounce = t.hasAnnounce && t.announce;
    //todo: rename with end
    // hasAlert: false,
    // alert: '',
    // hasAnnounce: false,
    // announce: '',
    const hasPlaylist = t.hasEndPlaylist && t.endPlaylist;
    const hasEndURL = t.hasEndPlayUrl && t.endPlayUrl;

    const c = timer.chaining.onend;
    const hasChaining = c.chainEnabled && c.chainId;
    // console.log({
    //   hasAlert,
    //   hasAnnounce,
    //   hasPlaylist,
    //   hasEndURL,
    //   hasChaining,
    //   c

    return !!(
      hasAlert ||
      hasAnnounce ||
      hasPlaylist ||
      hasEndURL ||
      hasChaining
    );
  };

  const dropdownClass = ' absolute top-[-0px] mt-2  w-[200px]';
  const overlaidClass = ' mt-2 ';
  // let classAddition = overlaidClass;

  // useEffect(() => {
  //   console.log('activeTab', activeTab);
  //   // classAddition = activeTab === null ? overlaidClass : dropdownClass;
  // }, [activeTab]);

  return (
    <div
      className={` ${
        activeTab === null ? overlaidClass : dropdownClass
      } -left-[1px] right-[1px]   rounded-b-3xl border-amber-600 border-solid settingsCard settingsCard `}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
        <div
          className=""
          label="schedule"
          title="schedule"
          contentful={hasScheduleSettings()}>
          <OnSchedleForm name="schedule." timer={timer} timers={timers} />
        </div>
        <div
          className=""
          label="at start"
          title="at start"
          contentful={hasOnStartSettings()}>
          <OnStartForm name="timer." timer={timer} timers={timers} />
        </div>
        <div
          className=""
          label="interval"
          title="interval"
          contentful={hasIntervalSettings()}>
          <OnDuringForm name="interval." />
        </div>
        <div
          className=""
          label="at finish"
          title="at finish"
          contentful={hasOnEndSettings()}>
          {' '}
          <OnEndForm name="timer." timer={timer} timers={timers} />
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsBar;
