import React from 'react';
import { notifyInPage } from '../../notifiy';
import ButtonAnimation from './ButtonAnimation';
import { dataTestAttr, dataTestTagIds } from '../../../common/tags';

const InfoButton = ({ messageText, title, children }) => {
  const clickHandler = () => {
    notifyInPage(messageText, title, children);
  };
  return (
    <ButtonAnimation clickHandler={clickHandler}>
      <span
        title="Help"
        {...dataTestAttr(dataTestTagIds.infoButton)}
        className=" text-xs rounded-full ">
        ?
      </span>
    </ButtonAnimation>
  );
};

export default InfoButton;
