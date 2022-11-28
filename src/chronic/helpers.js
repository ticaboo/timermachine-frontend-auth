/*
    Home of logic (or at least not mixed in with front end)
*/

/*
    single timer stuff:
*/
import QueryString from 'qs';
import { latestStructure } from '../data/timers';

const decompressTimer = (targetObj, defaultObj, partIdentStrArray) => {
  const unCompressed = {};
  for (var partIdentStr of partIdentStrArray) {
    const part = targetObj[partIdentStr]
      ? { ...defaultObj[partIdentStr], ...targetObj[partIdentStr] }
      : defaultObj[partIdentStr];
    unCompressed[partIdentStr] = part;
  }
  return unCompressed;
};
/*
 ingest timer either from props or qs.
*/
export const ingestTimer = (timer) => {
  // console.log('SingleChronos mounted');
  let timerEncoded;
  let timerInject;
  const searchArray = window.location.search.split('?');

  //favour props.timer over url param.
  if (timer) {
    timerEncoded = timer;
  } else if (searchArray.length === 2 && searchArray[1].match('t=')) {
    timerEncoded = searchArray[1];
  }
  if (timerEncoded) {
    const qsObj = QueryString.parse(timerEncoded);
    if (qsObj) {
      timerInject = JSON.parse(qsObj.t);
    }
  }
  //todo: move to Utils / model concept in React?
  //spread is shallow hence:
  const uncompressedTimer = decompressTimer(timerInject, latestStructure, [
    'timer',
    'interval',
    'schedule'
  ]);

  // const chainingonendPart = latestStructure.chaining.onend;
  // timerInject.onend
  //   ? {
  //       ...latestStructure.chaining.onend,
  //       ...timerInject.onend
  //     }
  //   : latestStructure.chaining.onend;
  timerInject = { id: '', ...latestStructure, ...uncompressedTimer };
  // chaining: { onend: chainingonendPart }

  // console.log(timerInject);

  return timerInject;
};
