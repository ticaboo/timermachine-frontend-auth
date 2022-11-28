import React from 'react';
import { Link } from 'react-router-dom';

const NavExample = () => {
  return (
    <ul className="flex ml-12 mt-4">
      <li className="mr-8">
        <Link to="/" className="text-greem-500 hover:text-green-500">
          Timer
        </Link>
      </li>
      <li className="mr-8">
        <Link to="/features" className="text-greem-500 hover:text-green-500">
          Features
        </Link>
      </li>
      <li className="mr-8">
        <Link to="/artists" className="text-greem-500 hover:text-green-500">
          Artists
        </Link>
      </li>
      <li className="mr-8">
        <Link to="/subscribe" className="text-greem-500 hover:text-green-500">
          Login/Register
        </Link>
      </li>
    </ul>
  );
};

export default NavExample;
