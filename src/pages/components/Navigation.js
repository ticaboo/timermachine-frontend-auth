import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="flex mt-3">
      <Link to="/">| Timer |</Link>
      <Link to="/features">Features</Link>
      <Link to="/artists">Artists</Link>
      {/* <a> | About | </a> */}
      {/* <a> | Library(media) | </a> */}
      {/* <a> | Blog | </a>
    <a> | Subscribe (register/login/plans) | </a> */}
    </div>
  );
};

export default Navigation;
