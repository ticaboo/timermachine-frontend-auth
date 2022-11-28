import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const AutoSaver = ({ save, timer }) => {
  // console.log('FormChronos-timers', timers)
  const { watch } = useFormContext();
  const watchTimer = watch();

  useEffect(() => {
    if (JSON.stringify(timer) !== JSON.stringify(watchTimer)) {
      console.log('changed');
      save();
    }
  }, [watchTimer]);

  return <div></div>;
};

export default AutoSaver;
