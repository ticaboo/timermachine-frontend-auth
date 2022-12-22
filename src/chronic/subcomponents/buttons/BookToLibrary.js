/* BookToLibrary button */
import React from 'react';
import ButtonAnimation from './ButtonAnimation';
import { ArrowCurveLeftIcon } from '../../icons';
//import { useFormContext } from 'react-hook-form';

//import uuid from 'uuid';
//import { fuzzyNamingWithCount } from '../../../Utils';
//import l from '../../../logging';
//import useStorage from '../../../Use/UseTimerStorage';
//import { LOCAL_STORAGE_TIMER_KEY } from '../../../Use/usEnv';
import PubSub from 'pubsub-js';
import { TIMERCRU } from '../../../pub/topics';
import { dataTestAttr, dataTestTagIds } from '../../../common/tags';
import PropTypes from 'prop-types';
/*

*/

const BookToLibraryButton = ({ timer }) => {
  //const { watch } = useFormContext();
  // const timer = watch();
  //const { craddTimer } = useStorage({ key: LOCAL_STORAGE_TIMER_KEY });

  /* 
  Fixing:
  context is an in memory store, whereas we want to send the timer to the library (localStorage)
  NOTE : TODO: Needs fixing. 
  Work around as usling localStorage was updating the second item in the list
  instead of adding new one. Really wierd.
  What we have here is fuggly as sin. 

   addNew(timer) to useStorage() no memStore param.
   ux feedback tbd. -thinking animate in later based on creation time < now - 3000 such
*/
  const toLibSaver = () => {
    console.log('BookToLibraryButton clicked ');
    const toSaveTimer = { ...timer };
    toSaveTimer.id = '';
    PubSub.publish(TIMERCRU, toSaveTimer);
    setTimeout(() => {
      window.open('/', '_self');
    }, 500);
  };
  // const XtoLibSaver = () => {
  //   const timer = watch();
  //   const toSaveTimer = { ...timer };
  //   toSaveTimer.id = uuid.v4();

  //   const storageTimers = JSON.parse(
  //     localStorage.getItem(LOCAL_STORAGE_TIMER_KEY)
  //   );
  //   const existingNames = storageTimers.map((timer) => {
  //     return timer.timer.name;
  //   });
  //   const newName = fuzzyNamingWithCount(toSaveTimer.timer.name, existingNames);
  //   toSaveTimer.timer.name = newName;

  //   storageTimers.push(toSaveTimer);
  //   localStorage.setItem(
  //     LOCAL_STORAGE_TIMER_KEY,
  //     JSON.stringify(storageTimers)
  //   );

  //   const updatedStorageTimers = JSON.parse(
  //     localStorage.getItem(LOCAL_STORAGE_TIMER_KEY)
  //   );
  //   l('debug', 'updatedStorageTimers', { updatedStorageTimers });
  //   // craddTimer(toSaveTimer);

  //   setTimeout(() => {
  //     window.open('/', '_self');
  //   }, 500);

  //   //todo: needs feedback: notify somehow -done:
  //   // could be goto library, animate in based on creation time.
  //   // in browser notify/toast.
  // };
  return (
    <div
      className="flex justify-end m-1"
      title="pop to one timer"
      {...dataTestAttr(dataTestTagIds.bookToLibraryButton)}
      onClick={toLibSaver}>
      <ButtonAnimation>
        <div
          title="Save to your library."
          className="border-neutral-300 border-2 rounded-full mx-1 p-1 ">
          <ArrowCurveLeftIcon />
          {/* <ShareIcon /> */}
        </div>
      </ButtonAnimation>
    </div>
  );
};

BookToLibraryButton.propTypes = {
  timer: PropTypes.object
};

export default BookToLibraryButton;
