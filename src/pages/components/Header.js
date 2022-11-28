import React from 'react';
import Title from './Title';
import Navigation from './Navigation';
import NavExample from './NavExample';

const Header = () => {
  return (
    <div className="flex flex-row  baseWhite h-12 mt-2 mx-2 mb-4 border-b border-neutral-600">
      <Title />
      <NavExample />
    </div>
  );
};

export default Header;
