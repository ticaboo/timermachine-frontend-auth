import React from 'react';
import { useFormContext } from 'react-hook-form';
import InfoButton from './buttons/InfoButton';

const validNumbers = {
  h: '0 to 23',
  m: '0 to 59',
  month: '1 to 12',
  dayOfMonth: '1 to 31',
  dayOfWeek: '1 to 7'
};
const titles = {
  month: 'Month',
  dayOfMonth: 'Days Of Months',
  dayOfWeek: 'Days of the Week',
  h: 'Hours',
  m: 'Minutes',
  s: 'Seconds'
};

const CronFieldInput = ({ name, label, children, width }) => {
  const { register } = useFormContext();
  width = parseInt(width) || 90;

  const InfoMessage = (
    <div>
      <h2 className="text-bold">{titles[name.split('schedule.')[1]]}:</h2>
      <div>{validNumbers[name.split('schedule.')[1]]} valid numbers</div>
      <div>* any value</div>
      <div>, value list separator</div>
      <div> - range of values</div>
      <div> / step values</div>
    </div>
  );

  return (
    <div className="pt-1 w-[192px]">
      <input
        type="text"
        {...register(name)}
        autoCorrect="off"
        spellCheck="false"
        autoComplete="off"
        className={`ml-2 pl-2 h-8 rounded-md baseCell  w-[50px] max-w-[54px]`}
      />
      <span className="ml-3 -mt-3 text-sm furniture ">
        {label} <InfoButton children={InfoMessage} />
      </span>
      {children}
    </div>
  );
};

export default CronFieldInput;
