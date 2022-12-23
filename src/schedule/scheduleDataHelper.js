import cron from 'cron';
import { timeToHMformat } from '../Utils';

const getCron = (timer) => {
  //constructor(cronTime, onTick, onComplete, start, timezone, context, runOnInit, utcOffset, unrefTimeout)
  return new cron.CronJob(
    timer.schedule.cronPattern,
    () => {
      //NOOP : library node-cron erratic in browser (designed for server)
    }, //onTick
    null, //onComplete
    false // active the job to cb to 2nd param fn
    // optional - time zone.
  );
};

export const getNextSchedules = (size, scheduledTimers) => {
  const nextSchedules = [];

  var job;
  for (var key in scheduledTimers) {
    job = getCron(scheduledTimers[key]);
    const dateList = job.nextDates(size);
    // console.log('dateList', dateList);
    for (var dateKey in dateList) {
      nextSchedules.push({
        nextDate: dateList[dateKey].ts,
        dateFormatted: timeToHMformat(new Date(dateList[dateKey])),
        timers: [
          {
            id: scheduledTimers[key]['id'],
            name: scheduledTimers[key]['timer']['name']
          }
        ]
      });
    }
  }
  //console.log('nextSchedules', nextSchedules);
  // reduce it by nextDate
  let res = [];
  for (let i = 0; i < nextSchedules.length; i++) {
    const foundIndex = res.findIndex(
      (item) => item.nextDate === nextSchedules[i].nextDate
    );
    if (foundIndex >= 0) {
      res[foundIndex].timers.push(nextSchedules[i].timers[0]);
    } else {
      res.push(nextSchedules[i]);
    }
  }

  console.log('res', res);
  res.sort((a, b) => {
    return a.nextDate < b.nextDate;
  });
  return res;
};
