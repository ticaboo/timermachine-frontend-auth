import React from 'react';
import styled from 'styled-components';

const BottomRight = () => {
  return (
    <div className="flex flex-col w-[300px] h-[200px] bg-lime-400">
      <div className="bg-orange-300">A</div>
      <div className="bg-blue-300">B</div>
      <div className="ml-auto mt-auto">me go bottom right</div>
    </div>
  );
};

const OppositeInRow = () => {
  return (
    <div className="bg-orange-500 flex justify-between h-[100px] w-[400px]">
      <div className="bg-green-200 m-2">A</div>
      <div className="bg-green-200 m-2">B</div>
    </div>
  );
};

const Fbox = () => {
  return (
    <div className="flex flex-row flex-wrap   bg-green-300 text-veryLightGray">
      <div>
        {' '}
        <div className="m-4 w-[490px] h-[300px] bg-purple-500"></div>
      </div>
      <div className="m-4  w-[490px] h-[300px] bg-purple-500"></div>
      <div className="m-4  w-[490px] h-[300px] bg-purple-500"></div>
      <div className="m-4  w-[490px] h-[300px] bg-purple-500"></div>
      <div className="m-4  w-[290px] h-[300px] bg-purple-500"></div>
    </div>
  );
};
//const OppositeInRow = () => {return()}

const TimerGrid = () => {
  return (
    <div className="grid  place-items-center min-h-screen  bg-green-300 text-veryLightGray">
      <div className="grid gap-4 p-4 max-w-[1000px] xs:grid-cols-2  xxs:grid-cols-1">
        <div className=" w-[490px] h-[300px] bg-purple-500"></div>
        <div className=" w-[490px] h-[300px] bg-purple-600"></div>
        <div className=" w-[490px] h-[300px] bg-purple-500"></div>
        <div className=" w-[490px] h-[300px] bg-purple-600"></div>
        <div className=" w-[490px] h-[300px] bg-purple-500"></div>
        <div className=" w-[490px] h-[300px] bg-purple-600"></div>
        <div className=" w-[490px] h-[300px] bg-purple-500"></div>
        <div className=" w-[490px] h-[300px] bg-purple-600"></div>
      </div>
    </div>
  );
};

const ColumnGrid = () => {
  return (
    <div className="grid place-items-center min-h-screen  bg-blue-300 text-veryLightGray">
      <div className="grid gap-4 p-4 max-w-5xl xs:grid-cols-2  ">
        <h1 className="text-4xl font-extrabold xs:col-span-2 xs:w-1/2 xs:gap-4">
          Grid layout tailwindcss
        </h1>
        <p> Ispum......</p>
        <div className=" bg-pink-500"></div>
        <div className=" bg-pink-500"></div>
        <div className=" bg-pink-500"></div>
        <div className=" bg-pink-500"></div>
        <div className=" bg-pink-500"></div>
        <div className=" bg-pink-500"></div>
        <div className=" bg-pink-500"></div>
        <div className=" bg-pink-500"></div>
        <p> Ispum......</p>
      </div>
    </div>
  );
};

/*
Two things to try:

z-index / pos relative to not push down wrapped elements. see nav examples, modals too:
  here: simple.
  in app: complex with settings bar,tabs, borders.
  So: build up here - dummy/simple settings bar.
  note: relative works here, not in app (absolute yes - but all will be fixed from body on one row)

flex-wrap dand:
 start playing with this -might give insights/solutions to the above too.
*/

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const TimerCard = styled.div`
  width: 200px;
  height: 190px;
  //background: green;
  /* outline: 2px solid red;
  outline-offset: -2px; */
  box-shadow: 0px 0px 0px 2px red inset;

  /* box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: 2px solid red;
  border-bottom: none; */

  border-top-right-radius: 1.5rem /* 24px */;
  border-top-left-radius: 1.5rem;
  position: relative;
`;

const SettingBar = styled.div`
  width: 200px;
  height: 60px;
  border: solid green;
  border-top: none;
  border-bottom-right-radius: 1.5rem /* 24px */;
  border-bottom-left-radius: 1.5rem;
  position: absolute;
`;

const FlexWrapExample = () => {
  return (
    <div className="flex pt-4 flex-row flex-wrap  text-veryLightGray">
      <div className="m-4  w-[190px] h-[140px] bg-blue-500"></div>

      <div className="relative flex m-2 w-[190px] h-[140px] border-solid border-x-2 border-t-2 rounded-t-3xl z-0">
        {/* <div className="">BAR</div> */}
        <div className="absolute h-[40px]  w-[190px] border-solid border-x-2 border-b-2 top-[138px] -left-[2px]   ">
          <Title> Settings content</Title>
          <div> more content</div>
        </div>
      </div>

      {/* <TimerCard className="m-4  w-[190px] h-[140px]">
        <SettingBar className="relative w-[190px] top-[160px]">xxxx</SettingBar>
      </TimerCard> */}

      {/* <div className="relative m-4  w-[190px] h-[140px] bg-blue-500">
        <div className="absolute bg-yellow-200 top-[160px]">zzzz</div>
      </div> */}

      <div className="m-4  w-[190px] h-[140px] bg-blue-500"></div>
      <div className="m-4  w-[190px] h-[140px] bg-blue-500"></div>
      <div className="m-4  w-[190px] h-[140px] bg-blue-500"></div>

      <div className="m-4  w-[190px] h-[140px] bg-blue-500"></div>
    </div>
  );
};

export const FlexKata = () => {
  return (
    <>
      {/* <Fbox /> */}
      {/* <OppositeInRow /> */}
      {/* <TimerGrid /> */}
      <FlexWrapExample />
      {/* <ColumnGrid /> */}
      {/* <BottomRight /> */}
    </>
  );
};
