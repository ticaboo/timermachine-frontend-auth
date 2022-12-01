import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import cron from 'cron';
// import cronval from 'cron-validate';
// import { hasScheduleCron } from '../../logic';

/*

scheduler by cron.
Needs to know if schedule.hasCronPattern changes (enable-new cron, disable-kill cron)
hence needs to be in FormChronos <FormProvider> context wrapper.

*/

const enabledCrons = {};
/*
 Looks like this solves the cron zombie problem.
 need external var, and a setter.
 appears any state/ref when new cron.CronJob called is bound up.


 argh - not quite, code here seems to work as a singleton - which i didnt expect.
 i thought es6 modules were objects!!!? 
*/

const Scheduler = ({ play }) => {
  // console.log('FormChronos-timers', timers)
  const { watch } = useFormContext();
  const watchHasCronPattern = watch('schedule.hasCronPattern');
  const watchCronPattern = watch('schedule.cronPattern');
  const watchId = watch('id');
  const job = useRef();

  /*
        even though watchHasCronPattern changes in useEffect,
        it remains true here. I believe it is todo with the callback context.
        even assigning to enabled.current! looks like i need better hook grok / other hooks to deal with this.

        Finally - a work around. managing state with {timerid: hascron}
        is this beyond dirty, or actually should be managing state outside of front end?
        see enabledCrons = {}

    */
  function cronFired() {
    console.log('cronFired enabled?', enabledCrons[watchId], watchId);
    if (enabledCrons[watchId]) {
      play({ timerId: watchId });
    }
  }

  useEffect(() => {
    enabledCrons[watchId] = watchHasCronPattern;

    console.log('Scheduler: wathcTimer changed', watchHasCronPattern);
    if (watchHasCronPattern) {
      try {
        if (job.current) {
          job.current.stop();
        }
        job.current = new cron.CronJob(watchCronPattern, cronFired, null, true);
      } catch {
        console.log(
          'info',
          'new Cron failed. probably invalid cron - live edit could cause'
        );
      }
    } else {
      if (job.current) {
        console.log('KILL CRON');
        job.current.stop();
        console.log(job.current);
      }
    }
  }, [watchHasCronPattern]);

  return <></>;
};

export default Scheduler;

// //   useEffect(() => {
//     console.log(
//       'Chrono. timer changed. timer.schedule.hasCronPattern:',
//       timer.schedule.hasCronPattern
//     );
//     if (timer.schedule.hasCronPattern && timer.schedule.cronPattern) {
//       //final check cron is valid, and not every single second!
//       if (
//         cronval(timer.schedule.cronPattern).isValid() &&
//         timer.schedule.cronPattern !== 'x * * * * *'
//       ) {
//         /* prevent running every second */
//         if (handleSchedule) {
//           try {
//             job.current = new cron.CronJob(
//               timer.schedule.cronPattern,
//               handleSchedule,
//               null,
//               true
//             );
//           } catch {
//             l('info', 'invalid cron - live edit can cause');
//           }
//         }
//       }
//     } else {
//       if (job.current) {
//         console.log('KILL CRON');
//         job.current.stop();
//         console.log(job.current);
//         job.current = null;
//       }
//     }
//   }, timer);
