import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { AtScheduleIcon, CronCogsIcon } from './icons';
//import { lpad } from '../Utils';

const ScheduleDisplay = ({ timer }) => {
  const { watch } = useFormContext();
  const schedule = watch('schedule');
  // const [hasSchedule, setHasSchedule] = useState();

  // const checkHasSchedule = (timer) => {
  //   console.log('checkHasSchedule', timer);
  // };
  // useEffect(() => {
  //   console.log('checkHasSchedule', schedule);
  //   setHasSchedule(schedule.h !== '' || schedule.m !== '');
  // });

  return (
    <div title="schedule">
      <motion.div
        title=""
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}>
        <div className=" flex justify-start align-middle text-xs">
          {/* {!!schedule.h && !!schedule.m ? (
            lpad(schedule.h) + ':' + lpad(schedule.m)
          ) : ( */}
          <span className="pl-1">
            {!!schedule.hasCronPattern && <CronCogsIcon xy="5" />}
            {!schedule.hasCronPattern && <AtScheduleIcon xy="5" />}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default ScheduleDisplay;
