import React from 'react';
import ButtonAnimation from './ButtonAnimation';
import { PlayIcon } from '../../icons';
import { dataTestAttr, dataTestTagIds } from '../../../common/tags';

const PlayButton = ({ clickHandler, type }) => {
  return (
    <div
      {...dataTestAttr(dataTestTagIds.playButton)}
      title="Go!"
      className=" mx-2 p-1 ">
      <ButtonAnimation clickHandler={clickHandler} type={type}>
        <PlayIcon />
      </ButtonAnimation>
    </div>
  );
};

export default PlayButton;
