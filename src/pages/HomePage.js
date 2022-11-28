import React from 'react';
import Header from './components/Header';
//import SingleChronos from '../chronic/SingleChronos';
import TimerGroup from '../chronic/TimerGroup';
// import YTPlayer from '../chronic/YTPlayer';
import VideoPlayer from '../chronic/VideoPlayer/YTPlayer';
//import DemoStressTest from '../chronic/DemoStressTest';
//import ToLibButton from '../chronic/ToLibButton';
// import Members from '../Members/index';
import AuthMenu from '../auth/AuthMenu';
const HomePage = () => {
  return (
    <div>
      <Header />
      {/* <DemoStressTest /> */}
      authmenu- <AuthMenu /> -authmenu
      <TimerGroup />
      {/* <SingleChronos timer='t=%7B"direction"%3A-1%2C"schedule"%3A%7B"hasScheduleAnnounce"%3Afalse%2C"scheduleAnnounce"%3A""%2C"h"%3A""%2C"m"%3A""%2C"s"%3A""%7D%2C"timer"%3A%7B"name"%3A"homesingtimerwtf"%2C"h"%3A""%2C"m"%3A"5"%2C"s"%3A"5"%2C"hasAlert"%3Atrue%2C"alert"%3A"1"%2C"hasAnnounce"%3Afalse%2C"announce"%3A"type%20your%20text%20to%20announce"%2C"startPlaylist"%3A"1"%2C"endPlaylist"%3A"2"%2C"hasStartPlaylist"%3Atrue%2C"playDuringUrl"%3A"https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DW74E0wWUcqY%26list%3DPLGFsjC9dEUw5cXCjNGAoVISO552RzPLEg"%2C"hasPlayDuringUrl"%3Afalse%2C"hasEndPlaylist"%3Afalse%2C"endPlayerUrl"%3A"https%3A%2F%2Fopen.spotify.com%2Ftrack%2F0nrRP2bk19rLc0orkWPQk2"%2C"hasEndPlayUrl"%3Afalse%2C"endPlayUrl"%3A""%2C"hasStartAlert"%3Afalse%2C"startAlert"%3A"2"%2C"hasStartAnnounce"%3Afalse%2C"startAnnounce"%3A""%2C"hasStartPlayUrl"%3Afalse%2C"startPlayUrl"%3A""%7D%2C"interval"%3A%7B"name"%3A"interval"%2C"h"%3A""%2C"m"%3A""%2C"s"%3A""%2C"hasAlert"%3Afalse%2C"alert"%3A1%2C"hasAnnounce"%3Afalse%2C"announce"%3A"speak%20at%20interval"%7D%2C"chaining"%3A%7B"onend"%3A%7B"chainEnabled"%3Afalse%2C"chainId"%3A""%7D%7D%2C"chainAction"%3A""%2C"hasInterval"%3Afalse%2C"undefinedhasStartPlaylist"%3Afalse%2C"undefinedstartPlaylist"%3A"1"%2C"undefinedhasEndPlaylist"%3Afalse%2C"undefinedendPlaylist"%3A"1"%7D' /> */}
      {/* <ToLibButton
        // notificationmessage="incoming blurb"
        timer='t=%7B"direction"%3A-1%2C"schedule"%3A%7B"hasScheduleAnnounce"%3Afalse%2C"scheduleAnnounce"%3A""%2C"h"%3A""%2C"m"%3A""%2C"s"%3A""%7D%2C"timer"%3A%7B"name"%3A"homesingtimerwtf"%2C"h"%3A""%2C"m"%3A"5"%2C"s"%3A"5"%2C"hasAlert"%3Atrue%2C"alert"%3A"1"%2C"hasAnnounce"%3Afalse%2C"announce"%3A"type%20your%20text%20to%20announce"%2C"startPlaylist"%3A"1"%2C"endPlaylist"%3A"2"%2C"hasStartPlaylist"%3Atrue%2C"playDuringUrl"%3A"https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DW74E0wWUcqY%26list%3DPLGFsjC9dEUw5cXCjNGAoVISO552RzPLEg"%2C"hasPlayDuringUrl"%3Afalse%2C"hasEndPlaylist"%3Afalse%2C"endPlayerUrl"%3A"https%3A%2F%2Fopen.spotify.com%2Ftrack%2F0nrRP2bk19rLc0orkWPQk2"%2C"hasEndPlayUrl"%3Afalse%2C"endPlayUrl"%3A""%2C"hasStartAlert"%3Afalse%2C"startAlert"%3A"2"%2C"hasStartAnnounce"%3Afalse%2C"startAnnounce"%3A""%2C"hasStartPlayUrl"%3Afalse%2C"startPlayUrl"%3A""%7D%2C"interval"%3A%7B"name"%3A"interval"%2C"h"%3A""%2C"m"%3A""%2C"s"%3A""%2C"hasAlert"%3Afalse%2C"alert"%3A1%2C"hasAnnounce"%3Afalse%2C"announce"%3A"speak%20at%20interval"%7D%2C"chaining"%3A%7B"onend"%3A%7B"chainEnabled"%3Afalse%2C"chainId"%3A""%7D%7D%2C"chainAction"%3A""%2C"hasInterval"%3Afalse%2C"undefinedhasStartPlaylist"%3Afalse%2C"undefinedstartPlaylist"%3A"1"%2C"undefinedhasEndPlaylist"%3Afalse%2C"undefinedendPlaylist"%3A"1"%7D'
      /> */}
      <div className="m-2">
        <VideoPlayer className="baseWhite baseCard" />
      </div>
      {/* <SingleChronos
        timer={{
          id: '',
          direction: -1,
          chainAction: '',
          hasInterval: false,
          timer: {
            name: 'html encoded'
          }
        }}
      /> */}
      {/* <div className="articles"></div>
      <h2>About</h2>
      <span>
        A site dedicated to Time. With a timer thats easy to customise and
        bookmark for fast access. No more click, type, click click every time
        you just want to set a timer.
        <h2>How to use Timer</h2>
        <span>
          Give your timer a name, this will be spoken* when the timer ends. Set
          hours and or Minutes and or Seconds. Click Set ⇧. The address updates,
          now you can drag it to your bookmarks (it will be labeled with the
          name you gave it).
        </span>
        <div>* spoken message not availiable in all browsers.</div>
      </span> */}
    </div>
  );
};

export default HomePage;
