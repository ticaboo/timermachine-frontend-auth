import { timeToSeconds } from '../Utils';

/* 
  
  dont like this local global- timerData, need like this for now for UseAudio
*/
const useAlerts = (timerData) => {
  const sayAloud = (announce, name) => {
    const now = new Date();
    let h = now.getHours();
    // if (h === 0) h = '';
    let m = '' + now.getMinutes();
    if (m === '0') m = ' now. ';
    if (m.length === 1) m = '0' + m;
    const hoursMinutes = h + ' ' + m;

    let greeting;
    if (h >= 1 && h < 12) greeting = 'Good morning. ';
    if (h >= 12 && h < 17) greeting = 'Good afternoon. ';
    if (h >= 17 && h < 23) greeting = 'Good evening. ';
    if (h >= 23 && h < 34) greeting = 'Good night. ';

    //console.log('sayAloud.');
    const annouceWithVars = announce
      .replace('$t', hoursMinutes)
      .replace('$g', greeting)
      .replace('$n', name);

    console.log(annouceWithVars);

    speechSynthesis.cancel();
    if (speechSynthesis.pending === false) {
      var msg = new SpeechSynthesisUtterance(annouceWithVars);
      speechSynthesis.speak(msg);
    }
  };
  /*
  isPlayingVideo state?
  */

  const intervalDuration = () => {
    return timeToSeconds(
      timerData.interval.h,
      timerData.interval.m,
      timerData.interval.s
    );
  };

  const intervalActive = () => {
    return intervalDuration(timerData) === 0 ? false : true;
  };

  const hasChainedAction = () => {
    //console.log('timerData.chaining',timerData.chaining)
    if (
      timerData.chaining &&
      timerData.chaining.onend &&
      timerData.chaining.onend.chainEnabled &&
      timerData.chaining.onend.chainId &&
      timerData.chaining.onend.chainId.length > 1
    ) {
      //console.log('timerData.chaining: true ',timerData.chaining)
      return true;
    } else return false;
  };

  const pauseAlerts = () => {};

  return {
    sayAloud,
    intervalActive,
    hasChainedAction,
    intervalDuration,
    pauseAlerts
  };
};

export default useAlerts;
