import React from 'react';
import Title from './components/Title';
/*
suspense page for launched URL's -
Interstitial! 
e.g. start lullaby youtube vid when timer starts. before wake up heavy metal - pause sound with this Interstitial for more effect.
*/

const InterstitialPage = () => {
  return (
    <div>
      <Title />
      <div className="flex items-center opacity-50">
        <div className="flex border-2 ml-auto mr-auto align-center justify-center h-[240px] w-[240px] border-white border-r-4 rounded-lg   m-6 baseCard baseWhite">
          <div> Media Window</div>
        </div>
      </div>
    </div>
  );
};

export default InterstitialPage;
