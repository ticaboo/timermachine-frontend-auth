import { useState, useEffect, useRef } from 'react';
import uuid from 'uuid';

/*
useStorage: generic storage interface.
@see useTimerStorage for more specific case.
@param: options : required
options: {
  key , 
  useMem, either key or useMem must be specified.
  X-only in useTimerStorage for now: defaultData: if specified and storage new/empty - adds to store.
} 
*/

function useStorage(options) {
  const [data, setData] = useState([]); //list of all data -syncd to local storage.
  let storeMem = useRef();
  let key = useRef();

  function init() {
    console.log('useStorage mounted init', options);
    let storageData;
    if (!options) console.error('useStorage requires @param options');
    if (!options.key && !options.useMem)
      console.error(
        'useStorage. requires either @param options.key or options.useMem. got :',
        options
      );

    key.current = options.key || null;
    if (!key.current) {
      storeMem.current = options.storeMem;
    }

    if (storeMem.current === true) {
      storageData = [];
    } else {
      storageData = JSON.parse(localStorage.getItem(key.current));
    }
    setData(() => storageData);
  }
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    // fires when data array gets updated

    if (data && data.length > 0) {
      // console.log('!storeMem.current', !storeMem.current);
      if (!storeMem.current) {
        localStorage.setItem(key.current, JSON.stringify(data));
      }
    }
  }, [data]);

  function duplicateData(newData) {
    newData.id = uuid.v4();
    craddData(newData);
  }
  /* create/ add data */
  function craddData(newData) {
    // console.log('useStorage cradd', data, newData);
    if (!newData.id) {
      newData.id = uuid.v4();
    }
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
      setData(() => [...data, newData]);
    }
  }

  function removeData(id) {
    // // console.log('removing', id);
    setData(data.filter((data) => data.id !== id));
  }

  return {
    data,
    duplicateData,
    craddData,
    removeData
  };
}

export default useStorage;
