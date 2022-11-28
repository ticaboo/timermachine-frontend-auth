import React from 'react';
import ButtonAnimation from './ButtonAnimation';
import { PauseIcon } from '../../icons';

const PauseButton = ({ clickHandler }) => {
  return (
    <div className=" mx-2 p-1 ">
      <ButtonAnimation title="Stop/Pause" clickHandler={clickHandler}>
        <PauseIcon />
      </ButtonAnimation>
    </div>
  );
};

export default PauseButton;
