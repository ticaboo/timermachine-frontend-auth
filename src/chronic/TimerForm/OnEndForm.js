import React from 'react';
import CheckedText from '../../chronic/subcomponents/CheckedText';
import CheckedSelect from '../../chronic/subcomponents/CheckedSelect';
import CheckBox from '../subcomponents/CheckBox';
import audioData from '../../data/audio.json';
import ChainingRow from '../TimerForm/ChainingRow';

const OnEndForm = ({ name, timer, timers }) => {
  return (
    <div className="">
      {/* ALARM */}
      <CheckedSelect
        check={name + 'hasAlert'}
        selector={name + 'alert'}
        label="alert"
        selectOptions={audioData.AlarmSounds}
      />

      {/* TTS */}
      <CheckedText
        name={name + 'announce'}
        check={name + 'hasAnnounce'}
        label="voice"
      />

      {/* PLAYLIST */}
      <CheckedSelect
        check={name + 'hasEndPlaylist'}
        selector={name + 'endPlaylist'}
        label="playlist"
        selectOptions={audioData.Media}
      />

      {/* HYPERLINK */}
      <CheckedText
        name={'timer.endPlayUrl'}
        check={'timer.hasEndPlayUrl'}
        type="url"
        label="link"
      />

      {/* todo: on change - from false to true - check notification.in window, .permission */}
      <CheckBox check={'timer.hasEndNotification'} label="Notification" />

      {timer.chaining && (
        <ChainingRow name="chaining.onend." timers={timers} timer={timer} />
      )}

      <span className="flex mr-2 text-sm furniture justify-end">-end</span>
    </div>
  );
};

export default OnEndForm;
