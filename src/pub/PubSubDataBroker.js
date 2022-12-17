import PubSub from 'pubsub-js';
import uuid from 'uuid';

/*
  pojso local storage state management over pub sub.
  caveat: pubsub lib needs subscribers to be registered before any publishing.
  hence ugly:

    const tb = timerBroker()
    settimeout(() => tb.init, 100)
  but then - outside of React state control, nicely decoupled with pub sub,
  shared state local storage. job done.

  TODO:  
    0. tests yo mofo hack!
    y. decouple storage Key, default obj for add new, topics. -i.e. make it usable for different data -
    test case : timerLog... pub ok, subs - not receiving. key: symbols?  doubt as pub works. √

    z. mem store option (as per single timers.) ...
  
    x.parked/stewing: find more robust, eleagant way to init. (see other state mgmt libs/pubsubs/message queing/ simple stack?)
    defer pub until there are subs? cow -can of worms. evil timeout is dam handy!
*/

// const localStorageKey = 'Lab-timers-test';

class PubSubDataBroker {
  /*
  options: {
    localStorageKey required unless useMem true
    useMem: use inMemory, no localStorage.
    defaultNewItem opt
   topics: { /*pubsub topics:
      pubUpdatedAll, req
      subCrudItem, req
      subNewDefaultItem, opt
      subDeleteItem opt
    }
  }
  */

  data = [];
  localStorageKey;
  defaultNewItem = null;
  topics = {};
  useMem = false;

  getterData = () => {
    if (!this.useMem) {
      console.log('getter key:', this.localStorageKey);
      const fromLS = localStorage.getItem(this.localStorageKey);
      console.log('fromLS', fromLS);
      this.data = JSON.parse(fromLS);
    }
    return this.data;
  };
  setterData = (newData) => {
    this.data = newData;
    if (!this.useMem)
      localStorage.setItem(this.localStorageKey, JSON.stringify(newData));
    PubSub.publish(this.topics.pubUpdatedAll, this.data);
  };

  initLocalStorage = () => {
    if (this.useMem === true) {
      this.setterData([]);
      return;
    }
    const fromLS = localStorage.getItem(this.localStorageKey);
    if (fromLS === null || fromLS === 'undefined') {
      if (this.defaultNewItem) {
        //defaultNewItem is optional
        this.setterData([{ ...this.defaultNewItem, id: uuid.v4() }]);
      } else {
        this.setterData([]);
      }
    }
  };

  constructor(options) {
    if (!options) throw new Error('dataBroker - options object required');
    if (!options.useMem && !options.localStorageKey)
      throw new Error(
        'dataBroker - options.localStorageKey property required unless options.useMem: true'
      );
    if (!options.topics)
      throw new Error('dataBroker - options.topics sub property required');
    if (!options.topics.pubUpdatedAll)
      throw new Error(
        'dataBroker - options.topics.pubUpdatedAll property required'
      );
    if (!options.topics.subCrudItem)
      throw new Error(
        'dataBroker - options.topics.subCrudItem property required'
      );
    this.localStorageKey = options.localStorageKey;
    this.defaultNewItem = options.defaultNewItem;
    this.topics = options.topics;
    this.initLocalStorage();
    this.getterData();

    PubSub.subscribe(this.topics.subCrudItem, (msg, _data) => {
      //console.log('recieved for update: _data', _data);
      this.craddData(_data);
    });

    PubSub.subscribe(this.topics.subNewDefaultItem, (msg, _data) => {
      this.addNew();
    });

    const deleteData = (id) => {
      const dataAfterRemoval = this.data.filter((data) => data.id !== id);
      this.setterData(dataAfterRemoval);
    };

    PubSub.subscribe(this.topics.subDeleteItem, (msg, _data) => {
      deleteData(_data);
    });
    //TODO: find better way of deference until subscribers ready.
    setTimeout(() => {
      PubSub.publish(this.topics.pubUpdatedAll, this.data);
    }, 150);
  }

  craddData = (newData) => {
    if (newData.id === '') newData.id = uuid.v4();
    //console.log('UseTimerStorage cradd');
    if (this.data.filter((data) => data.id === newData.id).length !== 0) {
      this.setterData(
        this.data.map((data) => {
          if (data.id === newData.id) {
            return {
              ...newData
            };
          }
          return data;
        })
      );
    } else {
      this.setterData([...this.data, newData]);
    }
  };

  addNew = () => {
    this.craddData({
      ...this.defaultNewItem,
      id: uuid.v4()
    });
  };
}

export default PubSubDataBroker;
