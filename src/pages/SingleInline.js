import React from 'react';
//import Header from './components/Header';
import SingleChronos from '../chronic/SingleChronos';
import YTPlayer from '../chronic/VideoPlayer/YTPlayer';

const SingleInlinePage = () => {
  console.log('nesty loaded');
  return (
    <div>
      {/* <div className="m-16 p-16">
        <SingleChronos timer='t=%7B"timer"%3A%7B"name"%3A"FOOOOK"%2C"s"%3A"5"%2C"hasAlert"%3Atrue%2C"alert"%3A"9"%2C"hasAnnounce"%3Atrue%2C"announce"%3A"timer%20done"%2C"hasStartAlert"%3Afalse%2C"startAlert"%3A"8"%2C"hasStartAnnounce"%3Atrue%2C"startAnnounce"%3A"cunt"%2C"hasEndPlaylist"%3Atrue%2C"endPlaylist"%3A"3"%2C"hasStartPlaylist"%3Atrue%2C"startPlaylist"%3A"3"%2C"hasPlayDuringUrl"%3Afalse%2C"playDuringUrl"%3A"https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DNrUIJY_Xu2s"%2C"hasEndPlayUrl"%3Afalse%2C"endPlayUrl"%3A"https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DfjM1-kzMs8A"%2C"hasStartPlayUrl"%3Afalse%7D%2C"interval"%3A%7B"name"%3A"interval"%2C"s"%3A"4"%2C"hasAlert"%3Afalse%2C"alert"%3A"1"%2C"hasAnnounce"%3Afalse%7D%2C"schedule"%3A%7B"hasScheduleAnnounce"%3Afalse%2C"scheduleAnnounce"%3A"wake%20up"%7D%2C"chaining"%3A%7B"onend"%3A%7B"chainEnabled"%3Afalse%7D%7D%7D' />
      </div> */}

      <div className="basWhite">
        FULL MONTE
        <SingleChronos timer='t=%7B"timer"%3A%7B"name"%3A"MONTE"%2C"h"%3A"1"%2C"m"%3A"2"%2C"s"%3A"3"%2C"hasAlert"%3Atrue%2C"alert"%3A"6"%2C"hasAnnounce"%3Atrue%2C"announce"%3A"monte%20is%20done"%2C"hasStartAlert"%3Atrue%2C"startAlert"%3A"5"%2C"hasStartAnnounce"%3Atrue%2C"startAnnounce"%3A"monte%20begins"%2C"hasEndPlaylist"%3Atrue%2C"endPlaylist"%3A"6"%2C"hasStartPlaylist"%3Atrue%2C"startPlaylist"%3A"9"%2C"endPlayUrl"%3A"https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DfjM1-kzMs8A"%2C"hasStartPlayUrl"%3Afalse%2C"startPlayUrl"%3A""%7D%2C"interval"%3A%7B"name"%3A"MONTE"%2C"h"%3A"1"%2C"m"%3A"2"%2C"s"%3A"3"%2C"hasAlert"%3Atrue%2C"alert"%3A"6"%2C"hasAnnounce"%3Atrue%2C"announce"%3A"monte%20is%20done"%2C"hasStartAlert"%3Atrue%2C"startAlert"%3A"5"%2C"hasStartAnnounce"%3Atrue%2C"startAnnounce"%3A"monte%20begins"%2C"hasEndPlaylist"%3Atrue%2C"endPlaylist"%3A"6"%2C"hasStartPlaylist"%3Atrue%2C"startPlaylist"%3A"9"%2C"endPlayUrl"%3A"https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DfjM1-kzMs8A"%2C"hasStartPlayUrl"%3Afalse%2C"startPlayUrl"%3A""%7D%2C"schedule"%3A%7B"name"%3A"MONTE"%2C"h"%3A"1"%2C"m"%3A"2"%2C"s"%3A"3"%2C"hasAlert"%3Atrue%2C"alert"%3A"6"%2C"hasAnnounce"%3Atrue%2C"announce"%3A"monte%20is%20done"%2C"hasStartAlert"%3Atrue%2C"startAlert"%3A"5"%2C"hasStartAnnounce"%3Atrue%2C"startAnnounce"%3A"monte%20begins"%2C"hasEndPlaylist"%3Atrue%2C"endPlaylist"%3A"6"%2C"hasStartPlaylist"%3Atrue%2C"startPlaylist"%3A"9"%2C"endPlayUrl"%3A"https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DfjM1-kzMs8A"%2C"hasStartPlayUrl"%3Afalse%2C"startPlayUrl"%3A""%7D%7D' />
      </div>
      <div className="basWhite">
        Yoga
        <SingleChronos timer='t=%7B"timer"%3A%7B"name"%3A"MONTE"%2C"h"%3A"1"%2C"m"%3A"2"%2C"s"%3A"3"%2C"hasAlert"%3Atrue%2C"alert"%3A"6"%2C"hasAnnounce"%3Atrue%2C"announce"%3A"monte%20is%20done"%2C"hasStartAlert"%3Atrue%2C"startAlert"%3A"5"%2C"hasStartAnnounce"%3Atrue%2C"startAnnounce"%3A"monte%20begins"%2C"hasEndPlaylist"%3Atrue%2C"endPlaylist"%3A"6"%2C"hasStartPlaylist"%3Atrue%2C"startPlaylist"%3A"9"%2C"endPlayUrl"%3A"https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DfjM1-kzMs8A"%2C"hasStartPlayUrl"%3Afalse%2C"startPlayUrl"%3A""%7D%2C"interval"%3A%7B"name"%3A"MONTE"%2C"h"%3A"1"%2C"m"%3A"2"%2C"s"%3A"3"%2C"hasAlert"%3Atrue%2C"alert"%3A"6"%2C"hasAnnounce"%3Atrue%2C"announce"%3A"monte%20is%20done"%2C"hasStartAlert"%3Atrue%2C"startAlert"%3A"5"%2C"hasStartAnnounce"%3Atrue%2C"startAnnounce"%3A"monte%20begins"%2C"hasEndPlaylist"%3Atrue%2C"endPlaylist"%3A"6"%2C"hasStartPlaylist"%3Atrue%2C"startPlaylist"%3A"9"%2C"endPlayUrl"%3A"https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DfjM1-kzMs8A"%2C"hasStartPlayUrl"%3Afalse%2C"startPlayUrl"%3A""%7D%2C"schedule"%3A%7B"name"%3A"MONTE"%2C"h"%3A"1"%2C"m"%3A"2"%2C"s"%3A"3"%2C"hasAlert"%3Atrue%2C"alert"%3A"6"%2C"hasAnnounce"%3Atrue%2C"announce"%3A"monte%20is%20done"%2C"hasStartAlert"%3Atrue%2C"startAlert"%3A"5"%2C"hasStartAnnounce"%3Atrue%2C"startAnnounce"%3A"monte%20begins"%2C"hasEndPlaylist"%3Atrue%2C"endPlaylist"%3A"6"%2C"hasStartPlaylist"%3Atrue%2C"startPlaylist"%3A"9"%2C"endPlayUrl"%3A"https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DfjM1-kzMs8A"%2C"hasStartPlayUrl"%3Afalse%2C"startPlayUrl"%3A""%7D%7D' />
      </div>
      <YTPlayer />
    </div>
  );
};

export default SingleInlinePage;
