import React from 'react';
import Header from './components/Header';
import SingleChronos from '../chronic/SingleChronos';
import YTPlayer from '../chronic/VideoPlayer/YTPlayer';

const SingleTimerPage = () => {
  return (
    <div>
      <Header />
      <div className="m-16 p-16">
        <SingleChronos />
      </div>
      <YTPlayer />
    </div>
  );
};

export default SingleTimerPage;
