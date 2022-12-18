import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DuplicateIcon } from '../../icons';
import ButtonAnimation from './ButtonAnimation';
import { dataTestAttr, dataTestTagIds } from '../../../common/tags';
import PubSub from 'pubsub-js';
// import { TIMERCLONEINPLACE } from '../../../pub/topics';

/*

*/

const DuplicateTimerButton = ({ clickHandler, duplicateTimer }) => {
  const { watch } = useFormContext();
  //const watchID = watch('id');

  const duplicateTimerHandler = () => {
    PubSub.publish(duplicateTimer, watch());
  };
  return (
    <ButtonAnimation
      title="New timer from this template"
      className="rounded-full  p-1 "
      clickHandler={duplicateTimerHandler}>
      <div
        title="New timer from this template"
        {...dataTestAttr(dataTestTagIds.duplicateTimerButton)}
        className="border-neutral-300 border-2 rounded-full mx-1 p-1 ">
        <DuplicateIcon />
      </div>
    </ButtonAnimation>
  );
};

export default DuplicateTimerButton;
