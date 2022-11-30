import React from 'react';
import { useFormContext } from 'react-hook-form';
import InfoButton from './buttons/InfoButton';

const CronFieldInput = ({ name, label, children, width }) => {
  const { register } = useFormContext();
  width = parseInt(width) || 90;
  const handleFocus = (e) => {};
  const handleBlur = (e) => {};
  return (
    <div className="pt-1">
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="text"
        {...register(name, { pattern: /^[A-Za-z]+$/i })}
        autoCorrect="off"
        spellCheck="false"
        autoComplete="off"
        className={`ml-2 pl-2 h-8 rounded-md baseCell  w-[${width}px] max-w-[${
          width + 10
        }px]`}
      />
      <span className="ml-3 -mt-3 text-sm furniture ">
        {label} <InfoButton />
      </span>
      {children}
    </div>
  );
};

export default CronFieldInput;
