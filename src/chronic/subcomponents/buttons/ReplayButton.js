import React from 'react';
import { ReplayIcon } from '../../icons';

import ButtonAnimation from './ButtonAnimation';
import { dataTestAttr, dataTestTagIds } from '../../../common/tags';
/*

*/

const ReplayButton = ({ clickHandler }) => {
  // const { watch } = useFormContext();

  return (
    <ButtonAnimation clickHandler={clickHandler}>
      <div
        className="border-neutral-300 border-2 rounded-full mx-2 p-1 "
        title="Restart Timer"
        {...dataTestAttr(dataTestTagIds.replayButton)}>
        <ReplayIcon />
      </div>
    </ButtonAnimation>
  );
};

export default ReplayButton;
