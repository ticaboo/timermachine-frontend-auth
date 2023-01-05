/* 
LibContainer
A container for components that alays go below Timers expanded submenu visually.
eg AddNewTimer, Timeline
*/
import React from 'react';

const LibContainer = ({ children }) => {
  return (
    <div className="flex  flex-row m-2 flex-wrap list-timers baseWhite baseCard furniture-border rounded-3xl  ">
      <div class="  mt-2 " style={{ zIndex: 0 }}>
        {children}
      </div>
    </div>
  );
};

export default LibContainer;
