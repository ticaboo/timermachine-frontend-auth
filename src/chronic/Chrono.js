import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormChronos from './TimerForm/FormChronos';
import Timer from './Timer';
import PubSub from 'pubsub-js';
import { SCHEDULE_FIRED } from '../pub/topics';
import { dataTestAttr, dataTestTagIds } from '../common/tags';

import {
  adjustDuration,
  timeToSeconds,
  secondsToTime,
  formatSecondsShortNoLetters
} from '../Utils';

import CardAnimation from './subcomponents/buttons/CardAnimation';
//import SettingsBar from './SettingsBar';

//import l from '../logging';

/*
  Chrono: Sole Responsibility: coordinates state between:
  FormChronos: for live Editing, in edit state changes
  Player: active timer/paused state.


  TODO: rename watchtimer - its a state not a hookform watch! very misleading.
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

  /*
   TODO: setDuration: is this fn necessary?
  */
  const setDuration = (adjustmentStr) => {
    const newSeconds = adjustDuration(adjustmentStr);
    const prevSeconds = timeToSeconds(
      timer.timer.h,
      timer.timer.m,
      timer.timer.s
    );
    const newDurationhms = secondsToTime(prevSeconds + newSeconds);

    timer.timer = { ...timer.timer, ...newDurationhms };
    PubSub.publish(craddTimer, timer);
    setTimeWatch(timer);
  };

  /*
      save. double purposing as play.
    */

  const submitter = (timer) => {
    // l('warn', 'Chronos.submitter.', { timer, timeWatch, playerVisible });
    console.log('info', 'Chronos.submitter', {
      timer,
      timeWatch,
      playerVisible
    });
    // l('info',
    //   'submitter',
    //   timer
    // );
    // if (!singleTimerFlag) {
    PubSub.publish(craddTimer, timer);
    // craddTimer(timer);

    //fires up player:
    // setTimeWatch(timer);
    // setPlayerVisible(() => true);
    //l('info','end of sumbintter, playerVisible', playerVisible);
  };

  const play = (options) => {
    // if (options.timerId) {
    //   console.log(
    //     'play cronfired opts id: ',
    //     options.timerId,
    //     ' tid :',
    //     timer.timerId
    //   );
    //   if (options.timerId === timer.id) {
    //     setTimeWatch(timer);
    //     setPlayerVisible(() => true);
    //   }
    // } else {
    setTimeWatch(timer);
    setPlayerVisible(() => true);
  };

  // const scheduledPlay = () => {
  //   console.log(
  //     'schedulePlay ',
  //     timeWatch.schedule.hasCronPattern,
  //     timer.schedule.hasCronPattern
  //   );
  //   if (timeWatch.schedule.hasCronPattern) {
  //     setTimeWatch(timer);
  //     setPlayerVisible(() => true);
  //   }
  // };

  useEffect(() => {
    PubSub.subscribe(SCHEDULE_FIRED, (msg, data) => {
      if (data === timer.id) {
        console.log('data === timer.id)', data === timer.id);
        console.log(
          'cronfire recieved by Chronos. hasCronPattern:',
          timer.schedule.hasCronPattern,
          ' timer: ',
          timer.timer.name,
          ' id: ',
          timer.id,
          ' data:',
          data
        );
        if (timer.schedule.hasCronPattern === true) {
          console.log('play on');
          play();
        }
      }
    });
  });

  const handleNextChainAction = (chainNextTimerId) => {
    // l('info','handleNextChainAction', chainNextTimerId);
    const nextTimer = timers.find((timer) => timer.id === chainNextTimerId);
    nextTimer.playCount = nextTimer.playCount ? nextTimer.playCount + 1 : 0;
    // l('info','next timer', nextTimer);
    setTimeWatch(nextTimer);
    setPlayerVisible(() => true);
  };

  const handleFocus = (e) => {
    //console.log('focus', timer.timer.name);
    if (document.location.pathname.match('single')) {
      document.title = timer.timer.name;
      console.log('focus, title set', document.title);
    }
    //console.log('focused');
  };
  const handleBlur = (e) => {
    //console.log('blur');
  };

  return (
    <div
      data-test-chronos-container
      data-test-timer-id={timer.id}
      // {...dataTestAttr(dataTestTagIds.playervisible, playerVisible)}
      {...(playerVisible && dataTestAttr(dataTestTagIds.playervisible))}>
      <CardAnimation>
        {collapsed && (
          <div className=" baseBlack baseWhite baseCard  w-[200px] rounded-3xl furniture-border ">
            <div>{timer.timer.name}</div>{' '}
            {formatSecondsShortNoLetters(
              timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s)
            )}
          </div>
        )}
        {!collapsed && (
          <div
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`baseBlack baseWhite baseCard w-[200px] rounded-3xl furniture-border  `}>
            {!playerVisible && (
              <div>
                {/* {timeWatch &&
                  timeWatch.schedule &&
                  timeWatch.schedule.hasCronPattern &&
                  'TW has cron'}
                {timer &&
                  timer.schedule &&
                  timer.schedule.hasCronPattern &&
                  'T. has cron'}
                <Schedule timer={timer} handleSchedule={scheduledPlay} /> */}
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
    </div>
  );
};
Chrono.propTypes = {
  timer: PropTypes.object,
  singleTimerFlag: PropTypes.bool,
  duplicateTimer: PropTypes.func,
  craddTimer: PropTypes.func,
  removeTimer: PropTypes.func,
  timers: PropTypes.array,
  collapsed: PropTypes.bool
};

export default Chrono;
