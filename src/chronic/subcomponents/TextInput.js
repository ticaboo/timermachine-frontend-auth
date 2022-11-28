import React from 'react';
import { useFormContext } from 'react-hook-form';

const TextInput = ({ name, label, children }) => {
  const { register } = useFormContext();

  return (
    <div className="pt-1">
      <div className="ml-3 -mt-3 text-sm furniture">{label}</div>
      <input
        type="text"
        {...register(name)}
        autoCorrect="off"
        spellCheck="false"
        autoComplete="off"
        className="ml-2 pl-2 h-8 rounded-md  baseCell    w-[156px] "
      />
      {children}
    </div>
  );
};

export default TextInput;
