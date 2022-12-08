import React, { useState, useEffect } from 'react';

import PubSub from 'pubsub-js';
import { HEARTBEAT } from '../../pub/topics';
import { dateTohms } from '../../Utils';
import { lpad } from '../../Utils';
import { dataTestAttr, dataTestTagIds } from '../../common/tags';

const Clock = () => {
  const [hms, setHms] = useState({ h: '', m: '', s: '' });

  // useEffect(() => {
  //   setHms(dateTohms(new Date()));
  // }, [beat]);

  useEffect(() => {
    const pubTokenHeartBeat = PubSub.subscribe(HEARTBEAT, () => {
      setHms(dateTohms(new Date()));
    });

    return () => {
      PubSub.unsubscribe(pubTokenHeartBeat);
    };
  });

  return (
    <div className="ml-2 mt-2" {...dataTestAttr(dataTestTagIds.clock)}>
      {lpad(hms.h)}:{lpad(hms.m)}:{lpad(hms.s)}
    </div>
  );
};

export default Clock;
