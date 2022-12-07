import React from 'react';
import { useFormContext } from 'react-hook-form';
import { dataTestAttr, dataTestTagIds } from '../../common/tags';

/*

*/

const CheckBox = ({ check, label }) => {
  const { register } = useFormContext();
  //const watchChecked = watch(check);

  return (
    <>
      {label && (
        <div className="ml-2 mt-2">
          <div className=" pr-2 h-8 w-[175px] rounded-md baseCell">
            <input
              type="checkbox"
              {...register(check)}
              {...dataTestAttr(dataTestTagIds[check + '.checkbox'])}
              className="ml-2"
            />{' '}
            <span className="ml-1 text-sm furniture">{label}</span>{' '}
          </div>
        </div>
      )}
      {!label && (
        <span>
          {' '}
          <input type="checkbox" {...register(check)} className="ml-2" />
        </span>
      )}
    </>
  );
};

export default CheckBox;
