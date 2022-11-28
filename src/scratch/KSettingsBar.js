import React from 'react';

//import ScheduleDisplay from './ScheduleDisplay';

/*
settings bar for nav of start,interval,finish. (default to finish tab open.)
icons
bar spacing, highlight effect/color. possibly tab dividers.
onClick - show matching panel

Tabs - Tab just giving impedence when its a one off not a reusable component.

Todo: Do basics - with Icon Styling - svg direct here.

doing: hasSettings per tab - to style green.
*/

const KSettingsBar = ({ timer, timers }) => {
  return (
    <div className="mt-2 z-0 relative ">
      <div className="" label="schedule">
        Schedule content
      </div>{' '}
      title="schedule"
    </div>
  );
};

export default KSettingsBar;
