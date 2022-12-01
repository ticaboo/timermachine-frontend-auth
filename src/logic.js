/*
The Abode of Logic - this place is your friend.
Your single source of truth! (not burried in front end compoments - ya dig?!!!)
Typically reused shiz goes to Utils - general, frontend display oriented.
Or here - Single source of truth land.
*/
import cronval from 'cron-validate';

export const hasScheduleCron = (timer) => {
  if (timer && timer.schedule && timer.schedule.hasCronPattern !== undefined) {
    return (
      timer.schedule.hasCronPattern &&
      cronval(timer.schedule.cronPattern).isValid()
    );
  } else {
    console.log(
      'logic.hasScheduleCron. hasCronPattern: ',
      timer.schedule.hasCronPattern
    );
    return false;
  }
};

/*
users: settingsBar to green icon if has settings
*/
export const hasScheduleSettings = (timer) => {
  // console.log(
  //   'hasSched',
  //   timer.schedule.h,
  //   timer.schedule.h || timer.schedule.m
  // );
  const hasDAdjust =
    timer.schedule.hasDurationAdjustment &&
    timer.schedule.durationAdjustment.length !== 0;
  return !!(hasDAdjust || hasScheduleCron(timer));
};

export const hasOnStartSettings = (timer) => {
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
export const hasIntervalSettings = (timer) => {
  const hasIntervalTime =
    timer.interval.h || timer.interval.m || timer.interval.s;
  const hasEnabledAlert = timer.interval.hasAlert || timer.interval.hasAnnounce;
  //console.log('hasInterval', hasIntervalTime && hasEnabledAlert);
  return !!(hasIntervalTime && hasEnabledAlert);
};

export const hasOnEndSettings = (timer) => {
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

  return !!(hasAlert || hasAnnounce || hasPlaylist || hasEndURL || hasChaining);
};
