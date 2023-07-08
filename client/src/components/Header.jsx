import React from 'react';
import '../styles/Header.css'
import NavigationMenu from './NavigationMenu';

function Header() {
  return (
    <header className='r1'>
      <h1 className='application-name'>Q-Fantasy Pro</h1>
      <NavigationMenu/>
    </header>
  );
}

export default Header;