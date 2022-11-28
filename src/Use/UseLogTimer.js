import { LOCAL_STORAGE_TIMER_LOGS_KEY } from './usEnv';
//import useStorage from './UseStorage';
import useLocalStorage from '../Use/useLocalStorage';
import { timeToSeconds } from '../Utils';

/*
    useLogTimer:
    singlto(w)n for timer logs, model structure.
    consumers:
        timer.
            on play/restart: create log.
            on Done: finalase log.
            on Pause: ?

    timer.id
    start time
    completion timer
    expected end time
    pauses: (disregard for now)
    not completed.

[
    {
        timer.id,    
        timings: [ {startTime, expectedEnd, actualEnd}
    }   
]
note: timers can be changed / deleted hence orphaning info like name,duration etc. 
so should keep critical info - on each timing
*/

function useLogTimer() {
  //   const { data, craddData, removeData } = useStorage({
  //     key: LOCAL_STORAGE_TIMER_LOGS_KEY
  //   });

  const [timeLog, setTimeLog] = useLocalStorage(
    LOCAL_STORAGE_TIMER_LOGS_KEY,
    []
  );
  //const [id, setId] = useState();

  //   useEffect(() => {
  //     console.log('useLogTimer mount. data', timeLog, timer.id);
  //     setId(timer.id);
  //   }, []);

  function atCommenceLog(timer) {
    console.log('atCommenceLog', timer.id);
    // if (!data) init();
    //crad timing Id, with pushed Timing
    // const filteredLogs = timeLog.filter((log) => log.id === timer.id);
    // const existinglog = filteredLogs.length >= 1 ? filteredLogs[0] : null; //should be ===1.

    const duration = timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s);
    const newTiming = {
      startTime: Date.now(),
      expectedEnd: Date.now() + duration * 1000,
      duration,
      completedAt: null
    };
    //log.timings.push(newTiming);
    const i = timeLog.findIndex((log) => log.id === timer.id);
    console.log('i', i);
    if (i === -1) {
      //   const targetLogArray = Array.from(timeLog);
      //   targetLogArray.push(log);
      const newLog = { id: timer.id, timings: [newTiming] };
      timeLog.push(newLog);
      setTimeLog(timeLog);
    } else if (i >= 0) {
      //replace in timeLog, set.
      // const targetLogArray = Array.from(timeLog);
      timeLog[i].timings.push(newTiming);
      setTimeLog(timeLog);
    }
  }

  function atCompleteLog(timer) {
    console.log('atCompleteLog', timer.id);
    //find timing
    const filteredLogs = timeLog.filter((log) => log.id === timer.id);
    const existinglog = filteredLogs.length >= 1 ? filteredLogs[0] : null;
    //assuming data all present and correct to start with:
    //todo: should do some sanity checks - like is the startTime reasonable to relate given the duration and end time.
    //just get most recent (last in array timing)
    if (!existinglog) {
      console.log(
        'SHOULD NOT HAPPEN. atComplete, timing not found: id: ',
        timer.id,
        'in logs: ',
        filteredLogs
      );
    } else {
      //   existinglog.timings[existinglog.timings.length - 1].completedAt =
      //     Date.now();

      const i = timeLog.findIndex((log) => log.id === timer.id);
      //   const targetLogArray = Array.from(timeLog);
      const timing = timeLog[i].timings[timeLog[i].timings.length - 1];
      timeLog[i].timings[timeLog[i].timings.length - 1].completedAt =
        Date.now();
      console.log(
        'Time Log completed - expected:',
        timing.completedAt - timing.expectedEnd,
        ' (duration): ',
        timing.duration
      );
      setTimeLog(timeLog);
    }
    console.log('atCompleteLog', existinglog);
  }

  function getCompletedCount(timerId) {
    const filteredLogs = timeLog.filter((log) => log.id === timerId);
    console.log(timerId, filteredLogs);
    if (filteredLogs.length === 1) {
      return filteredLogs[0].timings.length;
    } else return null;
  }

  return { atCommenceLog, atCompleteLog, getCompletedCount };
}

export default useLogTimer;
