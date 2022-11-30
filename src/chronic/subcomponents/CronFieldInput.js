import React from 'react';
import { useFormContext } from 'react-hook-form';

const CronFieldInput = ({ name, label, children, width }) => {
  const { register } = useFormContext();
  width = parseInt(width) || 90;
  return (
    <div className="pt-1">
      <input
        type="text"
        {...register(name)}
        autoCorrect="off"
        spellCheck="false"
        autoComplete="off"
        className={`ml-2 pl-2 h-8 rounded-md baseCell  w-[${width}px] max-w-[${
          width + 10
        }px]`}
      />{' '}
      <span className="ml-3 -mt-3 text-sm furniture ">{label}</span>
      {children}
    </div>
  );
};

export default CronFieldInput;
