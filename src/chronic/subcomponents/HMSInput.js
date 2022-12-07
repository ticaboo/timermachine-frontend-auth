import React from 'react';
import { useFormContext } from 'react-hook-form';
import { blurlPad } from '../../Utils';
import { dataTestAttr, dataTestTagIds } from '../../common/tags';

const HMSinput = ({ name }) => {
  const { register } = useFormContext();

  return (
    <div className="flex  ml-1  pt-1">
      <input
        type="text"
        {...register(name + 'h')}
        {...dataTestAttr(dataTestTagIds[name + 'inputh'])}
        placeholder="HH"
        className="w-[42px] p-2  m-1 rounded-md baseCell absblx   text-right"
        onBlur={blurlPad}
      />
      <span className="mt-[6px]  p-1  text-2xl">: </span>
      <input
        type="text"
        {...register(name + 'm')}
        {...dataTestAttr(dataTestTagIds[name + 'inputm'])}
        placeholder="MM"
        className="w-[44px] p-2  m-1 rounded-md baseCell absblx   text-right"
        onBlur={blurlPad}
      />
      <span className="mt-[6px] p-1 text-2xl">: </span>
      <input
        type="text"
        {...register(name + 's')}
        {...dataTestAttr(dataTestTagIds[name + 'inputs'])}
        placeholder="SS"
        className="w-[44px] p-2 m-1 rounded-md baseCell absblx   text-right"
        onBlur={blurlPad}
      />
    </div>
  );
};

export default HMSinput;
