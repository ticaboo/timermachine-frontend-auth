/**
 *
 * useVideo hook
 * ----
 * based on UseVideo. responsible multiple timers interacting with single video player.
 * tracking state of video Play, progress.
 * Logic to handle multiple timers, one video player.
 * Logic to handle pause/resume of timers that either - dont have a video config.
 * or B, the video config does not apply at that moment - for example, has
 * onStart video, but no onEnd video - and it is passed the end (ie in overtime.)
Either this needs to be aware of what is currently playing,
or video player tracks this info, and progress for each timer.
 */

import { useMemo, useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import { VIDEO_ID, VIDEO_PLAY } from '../pub/topics';
import { getPlaylistURL } from '../Utils';

export const getStartURL = (timerData) => {
  let url;
  //console.log('getStartURL', timerData);
  if (
    timerData.timer.hasStartPlaylist &&
    timerData.timer.startPlaylist !== null
  ) {
    url = getPlaylistURL(timerData.timer.startPlaylist);
  } else if (timerData.timer.hasStartPlayUrl) {
    url = timerData.timer.startPlayUrl;
  }
  return url;
};

export const getEndURL = (timerData) => {
  let url;
  if (timerData.timer.hasEndPlaylist && timerData.timer.endPlaylist !== null) {
    url = getPlaylistURL(timerData.timer.endPlaylist);
  } else if (timerData.timer.hasEndPlayUrl) {
    url = timerData.timer.endPlayUrl;
  }
  return url;
};

const useVideo = (options) => {
  // const audio = useMemo(() => new Audio(options.src), [options.src]);

  //dont use state, get from the timer / videoPlaying bus each time.
  //const [isPlaying, setIsplaying] = useState(false);
  const [url, setUrl] = useState();

  const playVideo = (_url) => {
    //resume may call with no url, it wants whatever the last url used by timer was.
    if (_url) setUrl(_url);
    else _url = url;
    //console.log('_url', _url);
    setTimeout(() => {
      PubSub.publish(VIDEO_ID, _url);
      PubSub.publish(VIDEO_PLAY, true);
    }, 100);
  };

  // pause the audio
  const pauseVideo = (timerData) => {
    PubSub.publish(VIDEO_PLAY, false);
  };

  // Toggle between play and pause
  // const toggle = () => (isPlaying ? pause() : play());
  // const reset = () => {};

  useEffect(() => {}, []);

  // Returning isPlaying, play, pause, toogle
  return { playVideo, pauseVideo, getStartURL, getEndURL };
};

export default useVideo;
