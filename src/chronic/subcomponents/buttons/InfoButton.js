import React from 'react';
import { notifyInPage } from '../../notifiy';
import ButtonAnimation from './ButtonAnimation';

const InfoButton = ({ infoText }) => {
  const clickHandler = () => {
    notifyInPage(infoText);
  };
  return (
    <ButtonAnimation clickHandler={clickHandler}>
      <span title="Help" className=" text-xs rounded-full ">
        ?
      </span>
    </ButtonAnimation>
  );
};

export default InfoButton;
