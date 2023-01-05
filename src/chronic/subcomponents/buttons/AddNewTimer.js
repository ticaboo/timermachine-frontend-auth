import React from 'react';
import ButtonAnimation from './ButtonAnimation';
import Quote from '../../../Quote';
import Clock from '../Clock';
import CardAnimation from './CardAnimation';
import PubSub from 'pubsub-js';
import { TIMERADDNEW } from '../../../pub/topics';
import { dataTest } from '../../../common/tags';

const AddNewTimer = () => {
  const addNewTimer = () => {
    PubSub.publish(TIMERADDNEW, null);
  };
  return (
    <>
      <CardAnimation>
        <div className="relative w-[200px] h-[180px]  ">
          <Clock />
          <Quote />
          {/* <div className='h-[202px]'></div> */}
          <div
            className="grid place-items-center justify-center mb-4"
            title="Add new timer">
            <ButtonAnimation clickHandler={addNewTimer}>
              <svg
                {...dataTest.addnewtimerbutton}
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </ButtonAnimation>
          </div>
        </div>
      </CardAnimation>
    </>
  );
};

export default AddNewTimer;
