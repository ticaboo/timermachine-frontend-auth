import { useState, useEffect, useRef } from 'react';
import uuid from 'uuid';

import { fuzzyNamingWithCount } from '../Utils';
import PubSub from 'pubsub-js';
import { LOCAL_STORAGE_UPDATED_EVENT } from '../pub/topics';

//import qs from 'qs';
// import Storage from './Storage';

/*
useStorage:
@param: options : required
options: {
  key , 
  useMem, either key or useMem must be specified.
  defaultData: if specified and storage new/empty - adds to store.
} 
local storage for arrays of objects.
ok, still tied to timers - with default data, fuzzy naming.
*/

const useTimerStorage = (options) => {
  const [data, setData] = useState([]); //list of all data -syncd to local storage.
  let storeMem = useRef();
  let key = useRef();

  const localStorageUpdated = (msg, data) => {
    // console.log('localStorageUpdated', data, key.current);
    if (data === key.current) {
      setData(JSON.parse(localStorage.getItem(key.current)));
    }
  };
  useEffect(() => {
    let storageData;
    if (!options) console.error('useStorage requires @param options');
    if (!options.key && !options.useMem)
      console.error(
        'useStorage requires either @param options.key or options.useMem. got :',
        options
      );

    key.current = options.key || null;
    if (!key.current) {
      storeMem.current = options.storeMem;
    }
    // if (options.useMem === true) {
    //   storeMem.current = true;
    // }

    if (storeMem.current === true) {
      storageData = [];
    } else {
      storageData = JSON.parse(localStorage.getItem(key.current));
    }

    if (
      (storageData === null ||
        (storageData.length === 0 && options.defaultData)) &&
      !storeMem.current
    ) {
      setData([{ ...options.defaultData, id: uuid.v4() }]);
    } else {
      setData(storageData);
    }

    const token = PubSub.subscribe(
      LOCAL_STORAGE_UPDATED_EVENT,
      localStorageUpdated
    );
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  useEffect(() => {
    // fires when data array gets updated
    /* needs the >0 for + timer to work */
    if (data && data.length > 0) {
      // console.log('!storeMem.current', !storeMem.current);
      if (!storeMem.current) {
        localStorage.setItem(key.current, JSON.stringify(data));
      }
      // console.log('data now:', data.length);
    }
  }, [data]);

  function duplicateData(newData) {
    newData.id = uuid.v4();
    const existingNames = data.map((data) => {
      return data.timer.name;
    });

    const newName = fuzzyNamingWithCount(newData.timer.name, existingNames);
    newData.timer.name = newName;

    craddData(newData);
  }
  /* create/ add data 
    Note: currently not working for useMem. see 
  */
  function craddData(newData) {
    if (newData.id === '') newData.id = uuid.v4();
    //console.log('UseTimerStorage cradd');
    if (data.filter((data) => data.id === newData.id).length !== 0) {
      setData(
        data.map((data) => {
          if (data.id === newData.id) {
            return {
              ...newData
            };
          }
          return data;
        })
      );
    } else {
      // adds new data to end of data array
      console.log('mem', storeMem.current);
      if (storeMem.current === true) {
        const targetData = [...data];
        targetData.push(newData);
        console.log('caradd:mem appending', data);
        setData(targetData);
      } else {
        setData([...data, newData]);
      }
    }
  }
  function addNewData() {
    const dataNumber = data.length + 1;
    let newData = options.defaultData;
    newData.timer.name = 'Timer ' + dataNumber;
    craddData({
      ...newData,
      id: uuid.v4()
    });
  }

  function removeData(id) {
    const dataAfterRemoval = data.filter((data) => data.id !== id);
    console.log(
      'removing',
      id,
      'data after removal should be: ',
      dataAfterRemoval
    );
    setData(dataAfterRemoval);
    /* useEffect:data needs the >0 for + timer to work  so blatting last one if all deleted here*/
    if (dataAfterRemoval.length === 0) {
      localStorage.setItem(key.current, JSON.stringify([]));
    }
  }

  function batchAdd(dataArray) {
    //should check each has an Id.
    setData([...data, ...dataArray]);
  }

  return {
    data,
    timers: data,
    batchAdd,
    duplicateTimer: duplicateData,
    craddTimer: craddData,
    addNewTimer: addNewData,
    removeTimer: removeData
  };
};

export default useTimerStorage;

// function getNewNumberedName(newData) {
//   const existingNames = data.map((data) => {
//     return data.timer.name;
//   });
//   const newName = fuzzyNamingWithCount(newData.timer.name, existingNames);
//   return newName;
// }
