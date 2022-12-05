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
  // const watchSchedule.hasCronPattern = watch('schedule.hasCronPattern');
  // const watchSchedule.cronPattern = watch('schedule.cronPattern');
  const watchSchedule = watch('schedule');
  const watchId = watch('id');
  const job = useRef();

  /*
        even though watchSchedule.hasCronPattern changes in useEffect,
        it remains true here. I believe it is todo with the callback context.
        even assigning to enabled.current! looks like i need better hook grok / other hooks to deal with this.

        Finally - a work around. managing state with {timerid: hascron}
        is this beyond dirty, or actually should be managing state outside of front end?
        see enabledCrons = {}

    */
  function cronFired() {
    // console.log('cronFired enabled?', enabledCrons[watchId], watchId);
    if (enabledCrons[watchId]) {
      play({ timerId: watchId });
    }
  }

  useEffect(() => {
    enabledCrons[watchId] = watchSchedule.hasCronPattern;

    console.log('Scheduler: wathcTimer changed', watchSchedule.hasCronPattern);
    if (watchSchedule.hasCronPattern) {
      try {
        if (job.current) {
          job.current.stop();
        }
        job.current = new cron.CronJob(
          watchSchedule.cronPattern,
          cronFired,
          null,
          true
        );
      } catch {
        console.log(
          'info',
          'new Cron failed. probably invalid cron - live edit could cause'
        );
      }
    } else {
      if (job.current) {
        // console.log('KILL CRON');
        job.current.stop();
        // console.log(job.current);
      }
    }
  }, [watchSchedule]);

  return <></>;
};

export default Scheduler;
