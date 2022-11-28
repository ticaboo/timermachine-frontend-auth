import React, { useState } from 'react';
import useCollapse from 'react-collapsed';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { SettingsIcon } from '../icons';
import ScheduleDisplay from '../ScheduleDisplay';

/*
Panelordion -like an accordion but simpler - a single collapsible, expandable panel.

https://blog.logrocket.com/create-collapsible-react-components-react-collapsed/
https://github.com/roginfarrer/react-collapsed

Tabs in Bar 
  expanded: border denote selected tab.
  collapsed: no borders

click tab -
  collapsed:
    expand
    select tab.

  expanded:
  is selected tab? 
    Y-  collapse
    N- select tab. 


*/

const CollapseControlled = ({ children, titleChildren }) => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  return (
    <div className="collapsible">
      <div className="pl-2  pr-2 pt-1 pb-1" {...getToggleProps()}>
        <div className="flex justify-between text-sm furniture">
          <div className="">
            <ScheduleDisplay />
          </div>
          <motion.div
            title=""
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}>
            <div className="flex items-start mt-1">
              <button
                {...getToggleProps({
                  onClick: () => setExpanded((prevExpanded) => !prevExpanded)
                })}>
                {isExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <div {...getCollapseProps()}>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default CollapseControlled;
