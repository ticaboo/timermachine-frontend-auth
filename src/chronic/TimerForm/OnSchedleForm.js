import React from 'react';
import CheckedText from '../subcomponents/CheckedText';
//import HMinput from '../subcomponents/HMInput';
import CronText from '../subcomponents/CronText';
import CronFieldInput from '../subcomponents/CronFieldInput';

const OnSchedleForm = ({ name }) => {
  return (
    <div className=" ">
      <CronText />

      <CronFieldInput name={name + 'h'} label="Hours" width="60" />
      <CronFieldInput name={name + 'm'} label="Minutes" width="60" />

      <CronFieldInput
        name={name + 'dayOfWeek'}
        label="Days of week"
        width="60"
      />
      <CronFieldInput name={name + 'month'} label="Months" width="60" />
      <CronFieldInput
        name={name + 'dayOfMonth'}
        label="Days in Months"
        width="60"
      />
      <CheckedText
        name={name + 'durationAdjustment'}
        check={name + 'hasDurationAdjustment'}
        label="Kaizen duration adj (+/-)" //"Duration adjustment"
        placeholder="00:00:00"
      />
      <span className="ml-2 text-sm furniture">schedule-</span>
    </div>
  );
};

export default OnSchedleForm;
