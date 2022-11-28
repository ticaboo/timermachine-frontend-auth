import React, { useState } from 'react';
import FormChronos from './TimerForm/FormChronos';
import Timer from './Timer';
import Schedule from './Schedule';
import {
  adjustDuration,
  timeToSeconds,
  secondsToTime,
  formatSecondsShortNoLetters
} from '../Utils';
import CardAnimation from './subcomponents/buttons/CardAnimation';
//import SettingsBar from './SettingsBar';

import l from '../logging';

/*
  Chrono: Sole Responsibility: coordinates state between:
   Editing: Form /Scheduled and
  Player.
 TODO:
  listen for schedule fires. 
  upon which start the timer.
*/

const Chrono = ({
  timer,
  singleTimerFlag,
  duplicateTimer,
  craddTimer,
  removeTimer,
  timers,
  collapsed
}) => {
  //state between Form and Player
  const [timeWatch, setTimeWatch] = useState(); // saved current timer state. set by Form-submiter, passed to Player.
  const [playerVisible, setPlayerVisible] = useState(false);

  const setDuration = (adjustmentStr) => {
    const newSeconds = adjustDuration(adjustmentStr);
    const prevSeconds = timeToSeconds(
      timer.timer.h,
      timer.timer.m,
      timer.timer.s
    );
    const newDurationhms = secondsToTime(prevSeconds + newSeconds);

    timer.timer = { ...timer.timer, ...newDurationhms };
    craddTimer(timer);
    setTimeWatch(timer);
  };

  /*
      save. double purposing as play.
    */

  const submitter = (timer) => {
    // l('warn', 'Chronos.submitter.', { timer, timeWatch, playerVisible });
    l('info', 'Chronos.submitter', { timer, timeWatch, playerVisible });
    // l('info',
    //   'submitter',
    //   timer
    // );
    // if (!singleTimerFlag) {

    craddTimer(timer);

    //fires up player:
    // setTimeWatch(timer);
    // setPlayerVisible(() => true);
    //l('info','end of sumbintter, playerVisible', playerVisible);
  };
  const play = () => {
    setTimeWatch(timer);
    setPlayerVisible(() => true);
  };

  const handleNextChainAction = (chainNextTimerId) => {
    // l('info','handleNextChainAction', chainNextTimerId);
    const nextTimer = timers.find((timer) => timer.id === chainNextTimerId);
    nextTimer.playCount = nextTimer.playCount ? nextTimer.playCount + 1 : 0;
    // l('info','next timer', nextTimer);
    setTimeWatch(nextTimer);
    setPlayerVisible(() => true);
  };

  const hasSchedule = () => {
    l('info', 'chrono.hasSchedule()', {
      schedule: timer.schedule,
      logictest:
        timer.schedule &&
        (timer.schedule.h !== '' ||
          timer.schedule.m !== '' ||
          timer.schedule.s !== '')
    });
    const hasSched =
      timer.schedule &&
      (timer.schedule.h !== '' ||
        timer.schedule.m !== '' ||
        timer.schedule.s !== '');
    l('info', 'hasSchedule', hasSched);
    return hasSched;
  };

  const handleSchedule = () => {
    // l('info','schedule triggered');
    setTimeWatch(timer);
    setTimeout(() => {
      setPlayerVisible(true);
    }, 100);
  };

  // UseScheduler(timer, handleSchedule);

  const handleFocus = (e) => {
    //console.log('focus', timer.timer.name);
    if (document.location.pathname.match('single')) {
      document.title = timer.timer.name;
      console.log('focus, title set', document.title);
    }
    console.log('focused');
  };
  const handleBlur = (e) => {
    console.log('blur');
  };

  return (
    <>
      <CardAnimation>
        {collapsed && (
          <div className=" baseBlack baseWhite baseCard  w-[200px] rounded-3xl furniture-border ">
            <div>{timer.timer.name}</div>{' '}
            {formatSecondsShortNoLetters(
              timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s)
            )}
            {/* <SettingsBar timer={timer} timers={timers} /> */}
          </div>
        )}
        {!collapsed && (
          <div
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`baseBlack baseWhite baseCard z-0 w-[200px] rounded-3xl furniture-border  `}>
            {!playerVisible && (
              <div>
                {hasSchedule() && (
                  <Schedule timer={timer} handleSchedule={handleSchedule} />
                )}
                <FormChronos
                  timer={timer}
                  singleTimerFlag={singleTimerFlag}
                  submitter={submitter}
                  play={play}
                  duplicateTimer={duplicateTimer}
                  removeTimer={removeTimer}
                  timers={timers}
                />
              </div>
            )}
            {playerVisible && (
              <div>
                <Timer
                  key={timeWatch.id}
                  timer={timeWatch}
                  setPlayerVisible={setPlayerVisible}
                  handleNextChainAction={handleNextChainAction}
                  setDuration={setDuration}
                />
                {/* <Timer
                key={timeWatch.id}
                timerData={timeWatch}
                setPlayerVisible={setPlayerVisible}
                autoPlay={autoPlay}
                handleNextChainAction={handleNextChainAction}
              /> */}
              </div>
            )}
          </div>
        )}
      </CardAnimation>
    </>
  );
};

export default Chrono;
