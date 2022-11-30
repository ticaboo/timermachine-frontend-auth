import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import cronstrue from 'cronstrue';
import cronval from 'cron-validate';
import CheckBox from './CheckBox';
import CopyToClipboardButton from './buttons/CopyToClipboardButton';
/*

*/

const CronText = ({ name }) => {
  const { watch, setValue } = useFormContext();
  //const cronPatternRegister = register('schedule.cronPattern');
  const cronPattern = watch('schedule.cronPattern');
  const cronM = watch('schedule.m');
  const cronH = watch('schedule.h');
  const cronDOM = watch('schedule.dayOfMonth');
  const cronDOW = watch('schedule.dayOfWeek');
  const cronMonth = watch('schedule.month');
  const [cronHumanised, setCronHumanised] = useState('');

  /*
  crontab string field.
  conversion of fields to crontabstring
  humanization
*/

  useEffect(() => {
    if (cronPattern) {
      const cronResult = cronval(cronPattern);
      if (cronResult.isValid()) {
        setCronHumanised(cronstrue.toString(cronPattern));
      } else {
        setCronHumanised('');
      }
      console.log(cronPattern, cronHumanised);
    }
  }, [cronPattern]);

  const cronFmt = (field, defaultVal) => {
    defaultVal = defaultVal || '*';
    return field ? field : defaultVal;
  };

  useEffect(() => {
    /* 
    m h dom m dow
    */

    let cronString =
      cronFmt(cronM, '0') +
      ' ' +
      cronFmt(cronH) +
      ' ' +
      cronFmt(cronDOM) +
      ' ' +
      cronFmt(cronMonth) +
      ' ' +
      cronFmt(cronDOW);
    const cronResult = cronval(cronString);
    if (cronResult.isValid()) {
      setValue('schedule.cronPattern', cronString);
    } else {
      console.log('invalid cron: ', cronString);
    }
    // if(cronM.) {}
  }, [cronH, cronM, cronDOM, cronMonth, cronDOW]);

  return (
    <div className="ml-2 mt-2">
      <div className=" flex pr-2 h-8 w-[175px] h-auto rounded-md baseCell text-xs overflow-scroll ">
        <CheckBox check={'schedule.hasCronPattern'} />
        <div className="pl-1 ">{cronHumanised}</div>

        <div className="mt-auto mr-auto">
          <CopyToClipboardButton
            textToCopy={
              'CronTab: "' +
              cronPattern +
              '". copied to clipboard. (' +
              cronHumanised +
              ').'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CronText;
