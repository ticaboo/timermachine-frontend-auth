import audioData from './data/audio.json';

export const secondsToTime = (seconds) => {
  return {
    h: Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0'),
    m: Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    s: Math.floor((seconds % 3600) % 60)
      .toString()
      .padStart(2, '0')
  };
};

export const secondsToShortTime = (seconds) => {
  const hms = {
    h: Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0'),
    m: Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    s: Math.floor((seconds % 3600) % 60)
      .toString()
      .padStart(2, '0')
  };
  let formatStr = '';
  if (hms.m !== '00') formatStr += ':' + hms.m;
  if (hms.s !== '00') formatStr += ':' + hms.s;
  return formatStr;
};

export const timeToSeconds = (h, m, s) => {
  const seconds = Number(h) * 3600 + Number(m) * 60 + Number(s);
  // console.log('timeToSeconds', seconds);
  return seconds;
};

/* 
for files stored in site/audio folder:
*/
export const getAudioSrc = (id, category) => {
  // // console.log('audioData:', audioData, category);
  // // console.log('audioData[category]', audioData[category]);
  if (!id || !category)
    return 'getAudioSrc(id, category): error id or category not given.';
  const src =
    '/assets/audio/' +
    audioData[category].find((audio) => audio.id === Number(id)).src;
  //// console.log('audio id:', id, 'src', src);
  return src;
};

export const getPlaylistURL = (id) => {
  const playlist = audioData['Media'].find((audio) => audio.id === Number(id));
  //console.log('getPlaylistURL',playlist)
  //console.log('getPlaylistURL(id):', id, ', src:', playlist);
  return playlist.src;
};

export const getAudioName = (id, category) => {
  const name = audioData[category].find(
    (audio) => audio.id === Number(id)
  ).name;
  //// console.log('audio id:', id, 'src', src);
  return name;
};
/*
more than just format:
stowatch vs timer logic.
overtimer logic (+)
*/
export const formatTime = (seconds, direction) => {
  var label = '';
  //overtime:
  if (seconds < 0 && direction === -1) {
    seconds = seconds * -1;
    label = '+';
  }
  const s = `0${seconds % 60}`.slice(-2);
  const minutes = `${Math.floor(seconds / 60)}`;
  const m = `0${minutes % 60}`.slice(-2);
  const h = `0${Math.floor(seconds / 3600)}`.slice(-2);

  return `${label} ${h}:${m}:${s}`;
  //todo: change to obj, allow styling in JSX.
  //return { h, m, s, label };
};

/*
 just seconds    :07
 m,s            1:07
 h,m,s         1:01:01
*/
export const formatSecondsShortNoLetters = (seconds) => {
  const getSeconds = `0${seconds % 60}`.slice(-2);
  const minutes = `${Math.floor(seconds / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
  let res = '';
  // :s
  if (getHours === '00' && getMinutes === '00' && getSeconds !== '00')
    res = ':' + getSeconds;

  //m:
  if (getHours === '00' && getMinutes !== '00' && getSeconds === '00')
    res = getMinutes;
  // m : s
  if (getHours === '00' && getMinutes !== '00' && getSeconds !== '00')
    res = getMinutes + ':' + getSeconds;
  // h : m
  if (getHours !== '00' && getMinutes !== '00' && getSeconds === '00')
    res = getHours + ':' + getMinutes;
  // h: m : s
  if (getHours !== '00' && getMinutes !== '00' && getSeconds !== '00')
    res = `${getHours}:${getMinutes}:${getSeconds}`;
  // if (getHours === '00' && getMinutes === '00' && getSeconds === '00')
  //   res = 'stopwatch';

  return res;
};

/*
if just minutes: 5m.
if hrs and minutes: 1:30h
if mins and seconds: 5:30m
if all 3: 1:30:45
*/
export const formatSecondsShort = (seconds) => {
  const getSeconds = `0${seconds % 60}`.slice(-2);
  const minutes = `${Math.floor(seconds / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
  let res = '';
  if (getHours === '00' && getMinutes !== '00' && getSeconds === '00')
    res = getMinutes + 'm';
  if (getHours === '00' && getMinutes !== '00' && getSeconds !== '00')
    res = getMinutes + ':' + getSeconds + 'm';
  if (getHours !== '00' && getMinutes !== '00' && getSeconds === '00')
    res = getHours + ':' + getMinutes + 'h';
  if (getHours !== '00' && getMinutes !== '00' && getSeconds !== '00')
    res = `${getHours}:${getMinutes}:${getSeconds}`;
  if (getHours === '00' && getMinutes === '00' && getSeconds === '00')
    res = 'stopwatch';

  return res;
};

export const formatTimeShort = (timer) => {
  const getHours = timer.h === '' ? '0' : timer.h;
  const getMinutes = timer.m === '' ? '0' : timer.m;
  const getSeconds = timer.s === '' ? '0' : timer.s;
  //// console.log(timer);
  let res = '';
  //minutes only
  if (getHours === '0' && getMinutes !== '0' && getSeconds === '0')
    res = getMinutes + 'm';
  //seconds only
  if (getHours === '0' && getMinutes === '0' && getSeconds !== '0')
    res = getSeconds + 's';
  //hours only
  if (getHours !== '0' && getMinutes === '0' && getSeconds === '0')
    res = getHours + 'h';

  //mins and seconds
  if (getHours === '0' && getMinutes !== '0' && getSeconds !== '0')
    res = getMinutes + 'm' + getSeconds + 's';
  //hrs and mins
  if (getHours !== '0' && getMinutes !== '0' && getSeconds === '0')
    res = getHours + 'h' + getMinutes + 'm';

  //all three
  if (getHours !== '0' && getMinutes !== '0' && getSeconds !== '0')
    res = `${getHours}:${getMinutes}:${getSeconds}`;
  //none
  if (getHours === '0' && getMinutes === '0' && getSeconds === '0') res = '';
  if (res !== '') res = '(' + res + ')';
  return res;
};

const trimAndElipse = (str, totalFieldsToTrimLength) => {
  //// console.log(totalFieldsToTrimLength);
  let trimmed = str.substring(0, totalFieldsToTrimLength);
  if (str.length > trimmed.length) trimmed += '..';
  return trimmed;
};
/*
label not used?
*/
export const formatTimerInfo = (timer, label = '', category) => {
  let res = '';
  if (formatTimeShort(timer) !== '') {
    if (timer.hasAnnounce || timer.hasAlert) {
      res = label + ' ' + formatTimeShort(timer) + '. ';

      if (timer.hasAlert)
        if (timer.hasAnnounce)
          // todo: fix (switched data/audio / Audio to AlarmSounds and IntervalSounds + Media for external links)
          // res +=
          //   trimAndElipse(getAudioName(timer.alert, 'AlarmSounds'), 35) + '. ';
          res += '`' + trimAndElipse(timer.announce, 35) + '`.';
    }
  }
  return res;
};

export const encodeObjToURI = (timer) => {
  const encodedTimer = encodeURIComponent(JSON.stringify(timer));
  return encodedTimer;
  // console.log('EMERGENCY -DO NOT USE IN PRODUCTION.Utils.encodeObjToURI ');
  // return JSON.stringify(timer);
};

/*
  Not used? timer -> json -> url encoded to allow nonstandard (and unsafe! characters)
  on reciept or url, it is automatically decoded (assumption)
*/
export const decodeObjFromURI = (timerURIComponentString) => {
  // const decodedTimer = JSON.parse(decodeURIComponent(timerURIComponentString));
  // return decodedTimer;
  console.log('EMERGENCY -DO NOT USE IN PRODUCTION.Utils.decodeObjFromURI ');
  return JSON.parse(timerURIComponentString);
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/*
  Deprecated. as using cron now. keeping for reference - for when add Seconds
  Schedules were only concerened with Hours and Minutes, NOT seconds.
  Utility function (probably only used for schedules/determining if has a schedule.)
*/
export const xhasHM = (obj) => {
  let res = false;
  if (obj.h && obj.h.length > 0) res = true;
  if (obj.m && obj.m.length > 0) res = true;
  // if (obj.s && obj.s.length >0) res = true //schedules just h,m for now.
  return res;
};

/*
 hours, minutes to time today (scheduling convenience fn)
 s optional
*/
export const hmtoTimeToday = (h, m, s, ms) => {
  let d = new Date();
  d.setHours(h);
  d.setMinutes(m);
  d.setSeconds(s || 0);
  d.setMilliseconds(ms || 0);
  return d.getTime();
};

export const dateTohms = (d) => {
  const date = d || new Date();
  return {
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    ms: date.getMilliseconds()
  };
};

export const timeToHMformat = (timeStamp) => {
  const date = new Date(timeStamp);
  return lpad(date.getHours()) + ':' + lpad(date.getMinutes());
};

export const lpad = (n, width, z) => {
  z = z || '0';
  n = n + '';
  if (n === '') return '';
  width = width || 2;
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

//pads all time fields. TODO: shouldnt live here. see yum/react-hook-forms formatting to do it right instead of quick dirty here!
//not used: done onblur
// export const timerlpad = (timer) => {
//   const t = { ...timer };
//   const padded = {
//     schedule: {
//       h: lpad(t.schedule.h),
//       m: lpad(t.schedule.m)
//     },
//     timer: {
//       h: lpad(t.timer.h),
//       m: lpad(t.timer.m),
//       s: lpad(t.timer.s)
//     },

//     interval: {
//       h: lpad(t.interval.h),
//       m: lpad(t.interval.m),
//       s: lpad(t.interval.s)
//     }
//   };
//   console.log('padded', padded);
//   return { ...timer, ...padded };
// };

export const blurlPad = (event) => {
  const { value } = event.target;
  event.target.value = lpad(value);
};

export const fuzzyNamingWithCount = (newName, existingNames) => {
  // console.log('dulicitous or what', newTimer);

  //todo: look for timer of sameName / sameName + ' ' + number.
  //interested in number of timers with same name, excluding trailing numbers:
  const nameParts = newName.split(' ');
  const lastPart = nameParts[nameParts.length - 1];
  if (!Number.isNaN(Number(lastPart))) {
    nameParts.pop();
  }
  const trimmedName = nameParts.join(' ');
  const namesakes = existingNames.filter((existingName) =>
    existingName.match(trimmedName)
  );
  //todo 2: name it with next highest number ;) noice:
  //Gin-Go? what if have [a,a 1, a 7, a 4] - ie human has fucked with it big time.
  //so as good as anything else (and simpler) is:
  //name it a namesake count. check if already one of same name - like a 7. if so add another number
  //until unique. VNoice.
  let candidateName = trimmedName + ' ' + (namesakes.length + 1);
  //note: includes self:
  const candidateClashes = existingNames.filter((existingName) =>
    existingName.match(candidateName)
  );
  //todo: the last bit - check if already 'a 7' collision scenario. cant be bothered now.
  //.... take care of first clash without going loopy:
  if (candidateClashes.length > 0) {
    candidateName =
      trimmedName + ' ' + (namesakes.length + candidateClashes.length);
  }
  return candidateName;
};

/*
todo: compare to latestStructure. if same -can remove as gets added back 
on arrival at single/?t=...
*/
export const flattenObject = (obj, compareObj) => {
  Object.keys(obj).forEach((key) => {
    console.log(key);
    if (obj[key] !== undefined && compareObj[key] !== undefined) {
      if (obj[key] === compareObj[key]) {
        delete obj[key];
      }
    }
  });
  //todo-if empty obj?
  return obj;
};

// /single ?t= urlencoded timer
// rehydrates from data/timers  latestStructure. : timer = {...latestStructure, ...fromUrl}
// so to dehydrate - remove props if same as defaultStructure.

export const flattenTimer = (timerOjb, latestStructure) => {
  //quick dirty. todo: stringify, regx out ="\", maybe falsys/where same as default.
  const timer = flattenObject(timerOjb.timer, latestStructure.timer);
  // const onend = flattenObject(
  //   timerOjb.chaining.onend,
  //   latestStructure.chaining.onen
  // );
  const interval = flattenObject(timerOjb.interval, latestStructure.interval);
  const schedule = flattenObject(timerOjb.schedule, latestStructure.schedule);
  const pancake = {};
  if (Object.keys(timer).length !== 0) pancake.timer = timer;
  if (Object.keys(interval).length !== 0) pancake.interval = interval;
  if (Object.keys(schedule).length !== 0) pancake.schedule = schedule;
  //if (Object.keys(onend).length !== 0) pancake.chaining = { onend };
  return pancake;
};
/*
  eg:
  '1m'
  '30s'
  '-1m' -fuck this do:
  '-00:01:00 -1 minute (can mask and validate it.)

*/
export const adjustDuration = (adjustmentStr) => {
  if (adjustmentStr === '') return 0;
  let seconds = 0;
  let sign = 1;
  if (adjustmentStr[0] === '-') {
    sign = -1;
    adjustmentStr = adjustmentStr.substring(1, adjustmentStr.length);
  }
  const hmsArray = adjustmentStr.split(':');
  if (hmsArray.length !== 3) {
    console.error(
      'Utlis.adjustDuration error-data format unexpected:',
      hmsArray
    );
    return 0;
  }
  seconds = timeToSeconds(hmsArray[0], hmsArray[1], hmsArray[2]);

  seconds = seconds * sign;

  return seconds;
};
