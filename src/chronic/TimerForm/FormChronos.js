import React, { useState, useEffect } from 'react'; //state in parent-Chrono
import { useForm, FormProvider } from 'react-hook-form';

import PlayButton from '../subcomponents/buttons/PlayButton';
import TimerRow from './TimerRow';

// import Collapse from '../subcomponents/Collapse';
// import CollapseControlled from '../subcomponents/CollapseControlled';
import DuplicateTimerButton from '../subcomponents/buttons/DuplicateTimerButton';
import RemoveTimerButton from '../subcomponents/buttons/RemoveTimerButton';
import BookmarkButton from '../subcomponents/buttons/BookmarkButton';
import BookToLibraryButton from '../subcomponents/buttons/BookToLibrary';

import SettingsBar from '../SettingsBar';
import AutoSaver from './AutoSaver';
import useLogTimer from '../../Use/UseLogTimer';
//import Scheduler from '../../schedule/ZScheduler';
/*
all Form stuff contained herein.
submit triggers state on parent Component: timeWatch, autoplay, playerVisible.
parent can determine actions such as  publish for distant components (like YTplayer to respond.)
*/

const FormChronos = ({
  timer,
  singleTimerFlag,
  submitter,
  duplicateTimer,
  removeTimer,
  timers,
  play
}) => {
  const methods = useForm({
    defaultValues: timer,
    mode: 'onBlur' //required for control - for react-select
  });

  const { getCompletedCount } = useLogTimer();
  const [activeTab, setActiveTab] = useState(null);
  const [completedCount, setCompletedCount] = useState(null);

  useEffect(() => {
    if (timer && timer.id) {
      const counter = getCompletedCount(timer.id);
      setTimeout(() => {
        setCompletedCount(counter);
      }, 1000);
    }
  }, []);

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitter)}>
          <AutoSaver save={methods.handleSubmit(submitter)} timer={timer} />
          <div className="flex justify-end">
            <RemoveTimerButton
              title="Delete"
              removeTimer={removeTimer}
              // disabledFlag={singleTimerFlag}
            />
          </div>
          <div>
            {/* debugging id's: {timer.id} */}
            <TimerRow name="timer." completedCount={completedCount} />
          </div>
          <div className="flex justify-between items-center  mt-2">
            {/* save and play */}
            <PlayButton title="Play" clickHandler={play} />
            {/* type="submit" */}
            <div className="flex justify-end">
              {singleTimerFlag && (
                <BookToLibraryButton
                  title="Save to your library."
                  timer={timer}
                />
              )}
              <BookmarkButton title="copies single timer to clipboard, and open in new tab." />
              <DuplicateTimerButton
                title="Duplicate to Time Collective"
                className=" mr-3"
                duplicateTimer={duplicateTimer}
              />
            </div>
          </div>

          <div className={` -mt-4 ${activeTab && ' relative'} `}>
            {/* <Collapse
              timer="timer"
              title="Settings"
              titleChildren={scheduleNub}>
              <SettingsBar timer={timer} timers={timers} />
            </Collapse> */}
            {activeTab && <div className="h-[36px]"></div>}
            <SettingsBar
              timer={timer}
              timers={timers}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {/* <CollapseControlled
              timer="timer"
              title="Settings"
              titleChildren={scheduleNub}>
              <SettingsBar timer={timer} timers={timers} />
            </CollapseControlled> */}
          </div>
        </form>
        {/* <Scheduler play={play} /> */}
      </FormProvider>
    </div>
  );
};

export default FormChronos;
