import React from 'react';
import { useFormContext } from 'react-hook-form';

/*

*/

const CheckBox = ({ name, check, label }) => {
  const { register } = useFormContext();
  //const watchChecked = watch(check);

  return (
    <div className="ml-2 mt-2">
      <div className=" pr-2 h-8 w-[175px] rounded-md baseCell">
        <input type="checkbox" {...register(check)} className="ml-2" />{' '}
        <span className="ml-1 text-sm furniture">{label}</span>{' '}
      </div>
    </div>
  );
};

export default CheckBox;
