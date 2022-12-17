import { useState, useEffect, useRef } from 'react';
import uuid from 'uuid';

import { fuzzyNamingWithCount } from '../Utils';

//import qs from 'qs';
// import Storage from './Storage';

/*
useStorage:
@param: options : required
options: {
  key , 
  storeMem, either key or useMem must be specified.
  defaultData: if specified and storage new/empty - adds to store.
} 
local storage for arrays of objects.
ok, still tied to timers - with default data, fuzzy naming.
*/

function useMemStorage(options) {
  const [data, setData] = useState([]); //list of all data -syncd to local storage.
  let storeMem = useRef();
  let key = useRef();
  useEffect(() => {
    let storageData;
    if (!options) console.error('useMemStorage. requires @param options');
    if (!options.key && !options.storeMem)
      console.error(
        'useMemStorage. requires either @param options.key or options.storeMem. got :',
        options
      );
    if (options.storeMem === true) {
      storeMem.current = true;
      storageData = [];
    } else if (!key.current) {
      storageData = JSON.parse(localStorage.getItem(key.current));
    }

    if (options.defaultData) {
      // &&  !storeMem.current
      setData([{ ...options.defaultData, id: uuid.v4() }]);
    } else {
      setData(storageData);
    }
    console.log(options, storageData);
  }, []);

  useEffect(() => {
    // fires when data array gets updated

    if (data && data.length > 0) {
      // console.log('!storeMem.current', !storeMem.current);
      if (!storeMem.current) {
        localStorage.setItem(key.current, JSON.stringify(data));
      }
      //console.log('data now:', data.length);
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
    //console.log('UseMemStorage cradd');
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

  function batchAdd(dataArray) {
    //should check each has an Id.
    setData([...data, ...dataArray]);
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
    // // console.log('removing', id);
    setData(data.filter((data) => data.id !== id));
  }

  return {
    timers: data,
    data,
    batchAdd,
    duplicateTimer: duplicateData,
    craddTimer: craddData,
    addNewTimer: addNewData,
    removeTimer: removeData
  };
}

export default useMemStorage;

// function getNewNumberedName(newData) {
//   const existingNames = data.map((data) => {
//     return data.timer.name;
//   });
//   const newName = fuzzyNamingWithCount(newData.timer.name, existingNames);
//   return newName;
// }
