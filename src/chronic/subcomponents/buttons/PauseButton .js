import React from 'react';
import ButtonAnimation from './ButtonAnimation';
import { PauseIcon } from '../../icons';
import { dataTestAttr, dataTestTagIds } from '../../../common/tags';

const PauseButton = ({ clickHandler }) => {
  return (
    <div className=" mx-2 p-1 ">
      <ButtonAnimation title="Stop/Pause" clickHandler={clickHandler}>
        <div {...dataTestAttr(dataTestTagIds.pauseButton)}>
          <PauseIcon />
        </div>
      </ButtonAnimation>
    </div>
  );
};

export default PauseButton;
