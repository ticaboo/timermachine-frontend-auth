import React from 'react';

import './index.css';
import { ReactNotifications } from 'react-notifications-component';
import TimerGroup from './chronic/TimerGroup';
import SingleChronos from './chronic/SingleChronos';
import YTPlayer from './chronic/VideoPlayer/YTPlayer';
import HeartBeat from './pub/HeartBeat';
import DemoStressTest from './chronic/DemoStressTest';
import ToLibButton from './chronic/ToLibButton';

import ReactDOM from 'react-dom'; /* todo - use client */
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

/* Production Index.
   attaches to targets. has no App!
   one timer library (with storage) to id='timer-app'
   as many single timers as you like to class='single-timer-app'
   required:
   one video player to id='yt-player'
   Note: required as heartbeat that drives timing goes here too.
   

*/
if (document.getElementById('timer-notifications')) {
  ReactDOM.render(
    <React.StrictMode>
      <ReactNotifications />
    </React.StrictMode>,
    document.getElementById('timer-notifications')
  );
} else {
  console.log('prod mount: No id: timer-notifications');
}

const listTargets = document.getElementsByClassName('timer-app');
for (var listTarget of listTargets) {
  let timer = null;
  if (listTarget.attributes.timer) {
    //todo: error catching/valid object?
    timer = listTarget.attributes.timer.value;
    // console.log('timer attrib found');
  }
  ReactDOM.render(
    <React.StrictMode>
      <TimerGroup timer={timer} />
    </React.StrictMode>,
    listTarget
  );
}

const toLibButtons = document.getElementsByClassName('tolib-button');
for (var toLibButton of toLibButtons) {
  let timer = null;
  if (toLibButton.attributes.timer) timer = toLibButton.attributes.timer.value;
  let notificationmessage = null;
  if (toLibButton.attributes.notificationmessage)
    notificationmessage = toLibButton.attributes.notificationmessage.value;
  ReactDOM.render(
    <React.StrictMode>
      <ToLibButton timer={timer} notificationmessage={notificationmessage} />
    </React.StrictMode>,
    toLibButton
  );
}

const singleTargets = document.getElementsByClassName('single-timer-app');
for (var singleTarget of singleTargets) {
  let timer = null;
  if (singleTarget.attributes.timer) {
    //todo: error catching/valid object?
    timer = singleTarget.attributes.timer.value;
    // console.log('timer attrib found');
  }
  ReactDOM.render(
    <React.StrictMode>
      <SingleChronos timer={timer} />
    </React.StrictMode>,
    singleTarget
  );
}
/* YTplayer: by ID : as should only be one per page 
   convenient as only one to put heartbeat here too.
*/
if (document.getElementById('yt-player')) {
  ReactDOM.render(
    <React.StrictMode>
      <HeartBeat />
      <YTPlayer />
    </React.StrictMode>,
    document.getElementById('yt-player')
  );
} else {
  console.log('prod mount: No id: yt-player');
}

if (document.getElementById('stress-demo')) {
  ReactDOM.render(
    <React.StrictMode>
      <DemoStressTest />
    </React.StrictMode>,
    document.getElementById('stress-demo')
  );
} else {
  console.log('prod mount: No id: stress-demo');
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

const listAuthMenuTargets = document.getElementsByClassName('auth-menu');
for (var listAuthMenuTarget of Array.from(listAuthMenuTargets)) {
  const rootMenu = ReactDOMClient.createRoot(listAuthMenuTarget);
  rootMenu.render(
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
