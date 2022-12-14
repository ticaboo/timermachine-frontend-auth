import React from 'react';
import { useFormContext } from 'react-hook-form';
import ButtonAnimation from './ButtonAnimation';
import PubSub from 'pubsub-js';
//import { TIMERDELETE } from '../../../pub/topics';

/*

*/

const DeleteSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const RemoveTimerButton = ({ disabledFlag, removeTimer }) => {
  const { watch } = useFormContext();
  const watchID = watch('id');

  const deleteTimer = () => {
    console.log('del time', removeTimer);
    PubSub.publish(removeTimer, watchID);
  };
  return (
    <div
      data-test-removebutton
      className="flex justify-end m-1"
      title="DANGER! Delete timer">
      {disabledFlag}
      {!disabledFlag && (
        <ButtonAnimation clickHandler={deleteTimer}>
          <DeleteSVG />
        </ButtonAnimation>
      )}
      {disabledFlag && <DeleteSVG disabled />}
    </div>
  );
};

export default RemoveTimerButton;
