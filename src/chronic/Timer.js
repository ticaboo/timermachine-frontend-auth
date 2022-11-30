import React from 'react';
import { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import { HEARTBEAT } from '../pub/topics';
import {
  getAudioSrc,
  timeToSeconds,
  timeToHMformat,
  formatSecondsShortNoLetters
  // secondsToTime,
  // formatTime
} from '../Utils';
import { Clock, OverClock } from './subcomponents/CounterClock';
import ReplayButton from './subcomponents/buttons/ReplayButton';
import PlayButton from './subcomponents/buttons/PlayButton';
import PauseButton from './subcomponents/buttons/PauseButton ';
import EditButton from './subcomponents/buttons/EditButton';

import UseAlerts from '../Use/useAlerts';
import { useAudio } from '../Use/useAudio';
import useVideo from '../Use/useVideo';
import useLogTimer from '../Use/UseLogTimer';
import { AtScheduleIcon } from './icons';
import { notifyBrowser } from './notifiy';

//import notify from './notifiy';
/*
ok, code doesnt handle minutes, seconds, but it fucking works!
see if can replace interval with heart beat.
fix hms -> s.
display h m s
ALL that i can see is different is:
     not initialising state
     init returns, and has no []

NXT:
    get seconds from timer.√
    active (pause)√
   
    Build up:
        direction √
        overclock √
        buttons...
        cycle, alerts.


    parking lot:
     delta 
     timer jiggle on seconds change.
    */

const Timer = ({
  timer,
  setPlayerVisible,
  handleNextChainAction,
  setDuration
}) => {
  const [heartBeatDeltaMS] = useState(0); // (new Date().getMilliseconds() + 1);

  const [remaining, setRemaining] = useState(
    timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s)
  );
  //heartbeat subscriber, useEffects - fire cycle twice only on start.
  const [, setOvershot] = useState();

  const [originalDuration] = useState(
    timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s)
  );
  const [expectedTime] = useState(
    Date.now() +
      1000 * timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s)
  );
  const [startTime] = useState(Date.now());

  const [pause, setPause] = useState(false);
  const [pausedSeconds, setPausedSeconds] = useState(0);
  const direction =
    timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s) === 0 ? 1 : -1;

  const { sayAloud, hasChainedAction, intervalActive, intervalDuration } =
    UseAlerts(timer);

  const { playVideo, pauseVideo, getStartURL, getEndURL } = useVideo();

  useEffect(() => {
    const pubTokenHeartBeat = PubSub.subscribe(HEARTBEAT, HeartBeatSubscriber);
    return () => {
      PubSub.unsubscribe(pubTokenHeartBeat);
    };
  });

  var HeartBeatSubscriber = function (msg, data) {
    if (!pause) {
      if (data.data.actualTime - data.data.expectedTime > 1000) {
        console.error('jump more than a second, adjust remaining perhaps?');
      }
      setTimeout(() => {
        cycle();
        // setRemaining(() => remaining - 1);
      }, heartBeatDeltaMS);
    }
    if (pause) {
      setPausedSeconds(pausedSeconds + 1);
    }
  };

  const cycle = () => {
    const stopSecond = 0;
    const elapsed = originalDuration - remaining;

    //overshoot - not quite there:
    // console.log(
    //   'trap:',
    //   direction,
    //   remaining,
    //   remaining > 0,
    //   Date.now() > expectedTime + 2000
    // );
    // if (
    //   direction === -1 &&
    //   remaining > 0 &&
    //   Date.now() > pausedSeconds * 1000 + expectedTime + 2000
    // ) {
    //   console.log(
    //     'overshoot by :',
    //     (Date.now() - expectedTime) / 1000,
    //     ' secs. Prob something slept.',
    //     remaining
    //   );
    //   setRemaining(() => 0);
    //   setOvershot(() => true);
    // } else {
    //   setRemaining(() => remaining - 1);
    // }
    setRemaining(() => remaining - 1);

    const atStart = () => {
      setOvershot(false);
      setPausedSeconds(() => 0);
      const startURL = getStartURL(timer);
      if (startURL) playVideo(startURL);

      atCommenceLog(timer); //todo: log direction
      //  console.log('BOUNCE once');

      if (timer.timer.hasStartAnnounce) {
        //debounce( ()=>  {sayAloud(timer.timer.startAnnounce)},100);
        sayAloud(timer.timer.startAnnounce, timer.name);
      }

      if (timer.timer.hasStartAlert) {
        /* play alert sound */
        startAudio.toggle();
        startAudio.reset();
      }
    };

    //stopwatch
    if (direction === 1 && remaining === originalDuration) {
      atStart();
    }

    //counddown
    if (direction === -1 && remaining === originalDuration) {
      atStart();
    }

    //when startUrl and endingURl- make 5 second sound gap before end.
    if (direction === -1 && remaining === 5) {
      const startURL = getStartURL(timer);
      if (startURL) pauseVideo();
    }

    //Timer done:
    if (direction === -1 && remaining === stopSecond) {
      atCompleteLog(timer);

      if (timer.timer.hasAlert) {
        /* play alert sound */
        endAudio.toggle();
        endAudio.reset();
        if (timer.timer.hasEndNotification) {
          notifyBrowser(
            'Timer ' + timer.timer.name + ' done. click to stop.',
            'TimeRmachine',
            pauser
          );
        }
      }

      const atEndStartURL = getStartURL(timer);
      const atEndEndURL = getEndURL(timer);
      if (atEndEndURL) {
        playVideo(atEndEndURL);
      }

      if (atEndStartURL && !atEndStartURL) {
        /* start + no end - halt. */
        //setVideoPlaying(()=> false);
        pauseVideo();
      }

      if (timer.timer.hasAnnounce) {
        sayAloud(timer.timer.announce, timer.name); /* speak at end */
      }
      if (hasChainedAction() === true) {
        //start chained timer.-so that it starts playing is the trick!
        //console.log('chain ganging', timer.chaining.onend.chainId)
        //TODO: kill current timer, Chronos starts next one. instead of:  clearInterval(countRef.current);
        handleNextChainAction(timer.chaining.onend.chainId);
      }
      console.log(timer.schedule);
      if (timer.schedule.hasDurationAdjustment) {
        if (timer.schedule.durationAdjustment.length !== 1) {
          //todo : change the time to seconds, change duration to seconds, add together.
          setDuration(timer.schedule.durationAdjustment);
        }
      }
      // doneCB(chainActionId);
      //tick interval continues for overtiming unless timer has a next chained timer.
    }

    //stopwatch interval
    if (
      direction === 1 &&
      intervalActive() &&
      (elapsed + 1) % intervalDuration() === 0
    ) {
      if (timer.interval.hasAlert) intervalAudio.toggle();
      if (timer.interval.hasAnnounce) sayAloud(timer.interval.announce);
    }

    //Intervals
    if (
      intervalActive() &&
      remaining > 1 &&
      (elapsed + 1) % intervalDuration() === 0
    ) {
      if (direction === -1 && remaining !== originalDuration && remaining > 1) {
        if (timer.interval.hasAlert) {
          intervalAudio.toggle();
        }
        if (timer.interval.hasAnnounce) sayAloud(timer.interval.announce);
        //CB halts block - never reaches return... (useCallBack?)/simpler? props/ref?
        //intervalCB();
      }
    }
  };

  /*
  Does the trick. have to access remaining in useEffect hook. duh
  do cycle in here 
  */
  // useEffect(() => {
  //   //console.log('remaining', remaining);
  //       cycle();
  // }, [remaining]);

  const pauser = () => {
    setPause(true);
    console.log('pauser()');
    if (startAudio.isPlaying) startAudio.pause();
    //if (endAudio.isPlaying)
    endAudio.pause();
    if (remaining > 3) {
      const startURL = getStartURL(timer);
      if (startURL) pauseVideo();
    } else if (remaining <= 0) {
      const endURL = getEndURL(timer);
      if (endURL) pauseVideo();
    }

    //PubSub.publish(VIDEO_PLAY, false
    // setTimeout(() => {

    //}, 100);
  };
  const resume = () => {
    setPause(false);

    if (remaining > 3) {
      const startURL = getStartURL(timer);
      if (startURL) playVideo();
    } else if (remaining <= 0) {
      const endURL = getEndURL(timer);
      if (endURL) playVideo();
    }
  };
  const edit = () => {
    setPausedSeconds(() => 0);
    pauser();
    setPlayerVisible(false);
  };

  const replay = () => {
    setPausedSeconds(() => 0);
    setRemaining(timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s));
    setPause(false);
    //pauser();
    // setTimeout(() => {
    //   start();
    // }, 100);
  };

  const startAudio = useAudio({
    src: getAudioSrc(timer.timer.startAlert, 'AlarmSounds'),
    loop: false,
    amplificationMultiplier: 1
  });
  const endAudio = useAudio({
    src: getAudioSrc(timer.timer.alert, 'AlarmSounds'),
    loop: hasChainedAction(timer) ? false : true,
    amplificationMultiplier: 1
  });

  const intervalAudio = useAudio({
    src: getAudioSrc(timer.interval.alert, 'IntervalSounds'),
    loop: false
  });
  const { atCommenceLog, atCompleteLog } = useLogTimer(timer.id);

  return (
    <div className="">
      <div className="ml-2 mt-2 pl-3 h-10 ">
        <div className="trimmed">
          <span className="text-2xl max-w-fit">{timer.timer.name}</span>
        </div>
        <div className="text-xs -mt-1 trimmed">
          {/* {formatTimerInfo(timer.interval, 'interval: ')} */}
        </div>
      </div>
      <div className="">
        {remaining <= 0 && direction === -1 && (
          <>
            <p className="flex justify-center text-green-500">
              <span className="text-5xl">00:00</span>
              <span className="text-2xl">00</span>
            </p>
            {/* <p className="text-2xl ml-4">{formatTime(remaining, direction)}</p> */}
            <div className="flex justify-center mr-8">
              <OverClock seconds={remaining} />
            </div>
          </>
        )}
        {remaining > 0 && direction === -1 && (
          <>
            <div className="flex justify-center">
              <Clock seconds={remaining} />
            </div>
            <div className="flex justify-centre ml-4 text-xs">
              <span className="pl-1">
                <AtScheduleIcon xy="4" />
              </span>
              {timeToHMformat(startTime)}⇢
              {timeToHMformat(expectedTime + pausedSeconds * 1000)}
            </div>
            <div className="flex justify-centre ml-6 text-xs h-3">
              {pausedSeconds > 0 &&
                ' + paused   ' + formatSecondsShortNoLetters(pausedSeconds)}
            </div>
          </>
        )}
        {direction === 1 && (
          <div className="flex justify-center">
            <Clock seconds={remaining} />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mr-2  ">
        {/* {!active.current && <PlayButton title="Start" clickHandler={start} />} */}
        {!pause && (
          <div className="flex items-start text-green-500">
            <PauseButton className="" title="Pause" clickHandler={pauser} />

            {/* <span className="text-xsm ml-2 mt-[10px]">
              {(direction === -1 && remaining > 0) || direction === 1
                ? 'Active'
                : 'Done'}
            </span> */}
          </div>
        )}
        {pause && (
          <div className="flex items-start">
            <PlayButton title="Start" clickHandler={resume} />
            <span className="text-xsm text-neutral-400 ml-2 ">
              {/* Paused */}
            </span>
          </div>
        )}
        {pause && (
          <div>
            <ReplayButton clickHandler={replay} />
            <EditButton title="Edit" clickHandler={edit} />
          </div>
        )}
      </div>
      {/* duration:{duration}
      remaining:{remaining}
      direction:{direction} */}
    </div>
  );
};

export default Timer;
