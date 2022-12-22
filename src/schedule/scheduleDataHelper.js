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
    for (var dateKey in dateList) {
      var nextDate = dateList[dateKey].ts;
      const matchedSchedules = nextSchedules.filter(
        //todo fix: Function declared in a loop contains unsafe references to variable(s) 'job'.eslintno-loop-func
        // eslint-disable-next-line
        (schedule) => schedule.nextDate === nextDate
      );
      if (matchedSchedules.length === 1) {
        matchedSchedules[0].timers.push({
          id: scheduledTimers[key]['id'],
          name: scheduledTimers[key]['timer']['name']
        });
      } else {
        //new ts
        nextSchedules.push({
          nextDate: job.nextDates(1)[0].ts,
          dateFormatted: timeToHMformat(new Date(job.nextDates(1)[0].ts)),
          timers: [
            {
              id: scheduledTimers[key]['id'],
              name: scheduledTimers[key]['timer']['name']
            }
          ]
        });
      }
    }
  }
  nextSchedules.sort((a, b) => {
    return a.nextDate < b.nextDate;
  });
  return nextSchedules;
};
