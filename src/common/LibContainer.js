/* 
LibContainer
A container for components that alays go below Timers expanded submenu visually.
eg AddNewTimer, Timeline
*/
import React from 'react';

const LibContainer = ({ children }) => {
  return (
    <div className="flex z-1 flex-row mt-3 flex-wrap list-timers baseWhite furniture-border  rounded-3xl baseCard ">
      <div class="  mt-2 " style={{ zIndex: 0 }}>
        {children}
      </div>
    </div>
  );
};

export default LibContainer;
