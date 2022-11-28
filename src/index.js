import React from 'react';

import './index.css';
import { ReactNotifications } from 'react-notifications-component';
import TimerGroup from './chronic/TimerGroup';
import SingleChronos from './chronic/SingleChronos';
import YTPlayer from './chronic/VideoPlayer/YTPlayer';
import HeartBeat from './pub/HeartBeat';
import DemoStressTest from './chronic/DemoStressTest';
import ToLibButton from './chronic/ToLibButton';

//import ReactDOM from 'react-dom'; /* todo - use client */
import * as ReactDOMClient from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';
import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom
} from 'supertokens-auth-react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './auth/Home';
import AuthMenu from './auth/AuthMenu';

import { SuperTokensConfig } from './auth/config';
SuperTokens.init(SuperTokensConfig);

/* **************************************************************
    PRODUCTION INDEX index.js from indexProd.js
   
    attaches to targets. has no App!
   one timer library (with storage) to id='timer-app'
   as many single timers as you like to class='single-timer-app'
   required:
   one video player to id='yt-player'
   Note: required as heartbeat that drives timing goes here too.
   
   Single per page (ID):

      timer-notifications
      timer-app
      yt-player (note includes Heartbeat)
      auth-signin
      stress-demo

  Multiple possible per page (CLASS)
      tolib-button
      single-timer-app
      auth-Menu


 ************************************************************** */

const timerNotificationEl = document.getElementById('timer-notifications');

if (timerNotificationEl) {
  const timerNotificationElRoot =
    ReactDOMClient.createRoot(timerNotificationEl);
  timerNotificationElRoot.render(
    <React.StrictMode>
      <ReactNotifications />
    </React.StrictMode>
  );
} else {
  console.log('prod mount: No id: timer-notifications');
}

const timerAppEls = document.getElementsByClassName('timer-app');
if (timerAppEls.length === 0) console.log('no class= timer-app found in Dom.');
if (timerAppEls.length > 0) {
  for (var timerAppEl of Array.from(timerAppEls)) {
    let timer = null;
    if (timerAppEl.attributes.timer) {
      //todo: error catching/valid object?
      timer = timerAppEl.attributes.timer.value;
      // console.log('timer attrib found');
    }
    const root = ReactDOMClient.createRoot(timerAppEl);
    root.render(
      <React.StrictMode>
        <TimerGroup timer={timer} />
      </React.StrictMode>
    );
  }
}

const toLibButtons = document.getElementsByClassName('tolib-button');
if (toLibButtons.length === 0)
  console.log('no class=tolib-button found in Dom.');
if (toLibButtons.length > 0) {
  for (var toLibButton of Array.from(toLibButtons)) {
    let timer = null;
    let notificationmessage = null;
    if (timerAppEl.attributes.timer) {
      if (toLibButton.attributes.timer)
        timer = toLibButton.attributes.timer.value;

      if (toLibButton.attributes.notificationmessage)
        notificationmessage = toLibButton.attributes.notificationmessage.value;
    }
    const root = ReactDOMClient.createRoot(timerAppEl);
    root.render(
      <React.StrictMode>
        <ToLibButton timer={timer} notificationmessage={notificationmessage} />
      </React.StrictMode>
    );
  }
}

const singleTimerTargets = document.getElementsByClassName('single-timer-app');
if (singleTimerTargets.length > 0) {
  const singleTimerTargetsRoot = ReactDOMClient.createRoot(singleTimerTargets);
  for (var singleTimerTarget of singleTimerTargets) {
    let timer = null;
    if (singleTimerTarget.attributes.timer) {
      timer = singleTimerTarget.attributes.timer.value;
    }
    singleTimerTargetsRoot.render(
      <React.StrictMode>
        <SingleChronos timer={timer} />
      </React.StrictMode>
    );
  }
}

const ytPlayerEl = document.getElementById('yt-player');
if (ytPlayerEl) {
  const ytPlayerElRoot = ReactDOMClient.createRoot(ytPlayerEl);
  ytPlayerElRoot.render(
    <React.StrictMode>
      <HeartBeat />
      <YTPlayer />
    </React.StrictMode>
  );
} else {
  console.log('yt-player not found in Dom');
}

const stressDemo = document.getElementById('stress-demo');
//console.log('stressDemo', stressDemo);
if (stressDemo) {
  const stressDemoRoot = ReactDOMClient.createRoot(stressDemo);
  stressDemoRoot.render(
    <React.StrictMode>
      <DemoStressTest />
    </React.StrictMode>
  );
}

const authSigninEl = document.getElementById('auth-signin');
console.log('authSigninEl', authSigninEl);

if (authSigninEl) {
  const authSigninRoot = ReactDOMClient.createRoot(authSigninEl);
  authSigninRoot.render(
    <React.StrictMode>
      <SuperTokensWrapper>
        <Router>
          <Routes>
            {/* This shows the login UI on "/auth" route */}
            {getSuperTokensRoutesForReactRouterDom(require('react-router-dom'))}
            <Route
              path="/signin"
              element={
                /* This protects the "/" route so that it shows
                                    <Home /> only if the user is logged in.
                                    Else it redirects the user to "/auth" */
                <SessionAuth>
                  <Home />
                </SessionAuth>
              }
            />
          </Routes>
        </Router>
      </SuperTokensWrapper>
    </React.StrictMode>
  );
}

const attachToClasses = (className, children) => {
  const listTargets = document.getElementsByClassName(className);
  if (listTargets.length === 0)
    console.log('no class=' + className + ' found in Dom.');
  if (listTargets.length > 0) {
    for (var listTarget of Array.from(listTargets)) {
      const root = ReactDOMClient.createRoot(listTarget);
      root.render(children);
    }
  }
};

attachToClasses(
  'auth-Menu',
  <React.StrictMode>
    <SuperTokensWrapper>
      <Router>
        <Routes>
          <Route path="*" element={<AuthMenu />} />
        </Routes>
      </Router>
    </SuperTokensWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
