import React from 'react';
import CheckedText from '../subcomponents/CheckedText';
import HMinput from '../subcomponents/HMInput';

const OnSchedleForm = ({ name }) => {
  return (
    <div className=" ">
      <HMinput name={name} />
      <CheckedText
        name={name + 'durationAdjustment'}
        check={name + 'hasDurationAdjustment'}
        label="Kaizen duration adj (+/-)" //"Duration adjustment"
        placeholder="00:00:00"
      />
      <CheckedText
        name={name + 'cronPattern'}
        check={name + 'hasCronPattern'}
        label="cron" //"Duration adjustment"
        placeholder="* * * * * *"
      />
      <span className="ml-2 text-sm furniture">schedule-</span>
    </div>
  );
};

export default OnSchedleForm;
