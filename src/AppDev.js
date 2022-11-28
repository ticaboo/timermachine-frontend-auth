import { Routes, Route } from 'react-router-dom'; //{ Link
import React, { props } from 'react'; //? todo-do i need to import props?
import InterstitialPage from './pages/InterstitialPage';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import ArtistsPage from './pages/ArtistsPage';

import SingleTimerPage from './pages/SingleTimerPage';
import SingleInlinePage from './pages/SingleInline';
import HeartBeat from './pub/HeartBeat'; //want one per page.
import { LogSwitch } from './LogSwitch';
import AuthorizePage from './pages/AuthorizePage';
import LoginPage from './pages/LoginPage';

// import { FlexKata } from './scratch/FlexKata';
// import FramerKata from './scratch/FramerKata';

function App() {
  //console.log('AppDev.props:', props);
  return (
    <>
      {/* <ReactNotifications /> */}
      <HeartBeat />
      <LogSwitch />

      <Routes>
        <Route>
          <Route index element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/single" element={<SingleTimerPage />} />
          <Route path="/nesty/nest" element={<SingleInlinePage />} />
          <Route path="interstitial" element={<InterstitialPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/authorize" element={<AuthorizePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
