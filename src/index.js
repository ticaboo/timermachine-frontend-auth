/* index.js */
import React from 'react';
import './index.css';
//import { ReactNotifications } from 'react-notifications-component';
import { ToastContainer } from 'react-toastify';
//import TimerGroup from './chronic/TimerGroup';
import SingleChronos from './chronic/SingleChronos';
import YTPlayer from './chronic/VideoPlayer/YTPlayer';

import HeartBeat from './pub/HeartBeat';
//import HeartBeat from './pub/HeartBeatNonWebWorker';

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
import DataBrokerage from './pub/DataBrokerage';
import PubGroup from './chronic/PubGroup';
import Scheduling from './schedule/Scheduling';

import { ThemeProvider } from 'styled-components';
import { theme } from './libs/shared-ui/sharedStyles';
import GlobalStyles from './libs/shared-ui/globalStyles';
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
      tolib-button : requires timer-notifications
      single-timer-app
      auth-Menu


 ************************************************************** */

const timerNotificationEl = document.getElementById('timer-notifications');

if (timerNotificationEl) {
  const timerNotificationElRoot =
    ReactDOMClient.createRoot(timerNotificationEl);
  timerNotificationElRoot.render(
    <React.StrictMode>
      {/* <ReactNotifications /> */}
      <ToastContainer />
    </React.StrictMode>
  );
} else {
  console.log('prod mount: No id: timer-notifications');
}

const ytPlayerEl = document.getElementById('yt-player');
if (ytPlayerEl) {
  const ytPlayerElRoot = ReactDOMClient.createRoot(ytPlayerEl);
  ytPlayerElRoot.render(
    <React.StrictMode>
      <HeartBeat />
      <YTPlayer />
      <DataBrokerage />
    </React.StrictMode>
  );
} else {
  console.log('yt-player not found in Dom');
}

// TODO: change back to by ID. should only be one per page (live edit loops otherwise)
const timerAppEls = document.getElementsByClassName('timer-app');
if (timerAppEls.length === 0) console.log('no class= timer-app found in Dom.');
if (timerAppEls.length > 0) {
  for (var timerAppEl of Array.from(timerAppEls)) {
    //let timer = null;
    if (timerAppEl.attributes.timer) {
      //todo: error catching/valid object?
      // timer = timerAppEl.attributes.timer.value;
      // console.log('timer attrib found');
    }
    const root = ReactDOMClient.createRoot(timerAppEl);
    root.render(
      // <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <PubGroup />
        <Scheduling />
      </ThemeProvider>
      // </React.StrictMode>
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
    if (toLibButton.attributes.timer) {
      if (toLibButton.attributes.timer)
        timer = toLibButton.attributes.timer.value;

      if (toLibButton.attributes.notificationmessage)
        notificationmessage = toLibButton.attributes.notificationmessage.value;
    }
    if (timer) {
      const root = ReactDOMClient.createRoot(toLibButton);
      root.render(
        <React.StrictMode>
          <ToLibButton
            timer={timer}
            notificationmessage={notificationmessage}
          />
        </React.StrictMode>
      );
    }
  }
}

const singleTimerTargets = document.getElementsByClassName('single-timer-app');
if (singleTimerTargets.length > 0) {
  for (var singleTimerTarget of singleTimerTargets) {
    const singleTimerTargetRoot = ReactDOMClient.createRoot(singleTimerTarget);
    let timer = null;
    if (singleTimerTarget.attributes.timer) {
      timer = singleTimerTarget.attributes.timer.value;
    }
    singleTimerTargetRoot.render(
      // <React.StrictMode>
      <SingleChronos timer={timer} />
      // </React.StrictMode>
    );
  }
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

const authMenuEls = document.getElementsByClassName('auth-menu');
if (authMenuEls.length === 0) console.log('no class=auth-menu found in Dom.');
if (authMenuEls.length > 0) {
  for (var authMenuEl of Array.from(authMenuEls)) {
    const authMenuElroot = ReactDOMClient.createRoot(authMenuEl);
    authMenuElroot.render(
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
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
