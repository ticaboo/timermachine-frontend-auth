import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import cronstrue from 'cronstrue';
import cron from 'cron-validate';

/*

*/

const CronText = ({ name }) => {
  const { watch } = useFormContext();
  const watchText = watch('schedule.cronPattern');
  const [cronHumanised, setCronHumanised] = useState('');

  useEffect(() => {
    if (watchText) {
      const cronResult = cron(watchText);
      if (cronResult.isValid()) {
        setCronHumanised(cronstrue.toString(watchText));
      } else {
        setCronHumanised('');
      }
      console.log(watchText, cronHumanised);
    }
  }, [watchText]);

  return (
    <div className="ml-2 mt-2">
      <div className=" pr-2 h-8 w-[175px] h-[80px] rounded-md baseCell text-xs">
        {cronHumanised}
      </div>
    </div>
  );
};

export default CronText;
