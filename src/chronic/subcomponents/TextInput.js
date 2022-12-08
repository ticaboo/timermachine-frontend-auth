import React from 'react';
import { useFormContext } from 'react-hook-form';
import { dataTestAttr, dataTestTagIds } from '../../common/tags';

const TextInput = ({ name, label, children }) => {
  const { register } = useFormContext();

  return (
    <div className="pt-1">
      <div className="ml-3 -mt-3 text-sm furniture">{label}</div>
      {label}
      <input
        type="text"
        {...register(name)}
        {...dataTestAttr(dataTestTagIds[name + '.inputtext'])}
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
