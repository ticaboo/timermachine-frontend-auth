import React from 'react';
import { notifyInPage } from '../../notifiy';
import ButtonAnimation from './ButtonAnimation';

const InfoButton = ({ messageText, title, children }) => {
  const clickHandler = () => {
    notifyInPage(messageText, title, children);
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
