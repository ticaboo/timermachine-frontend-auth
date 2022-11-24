import React, { useState } from 'react';
import { setLogging } from './logging';
let enabled = true;

export const LogSwitch = () => {
  const [enabled, setEnabled] = useState(false);
  const toggleEnabled = () => {
    setEnabled(!enabled);
    setLogging(enabled);
  };
  return (
    <div>
      <div>
        <div>
          log {enabled ? '√' : 'x'}-<button onClick={toggleEnabled}>o</button>
        </div>
      </div>
    </div>
  );
};
