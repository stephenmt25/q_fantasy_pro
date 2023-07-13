import React from 'react';
import '../styles/Header.css'
import NavigationMenu from './NavigationMenu';
import SignInModal from './SignInModal';

function Header({ managerName }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <header className='r1'>
      <div className='header-text'>
        <h1 className='application-name'>Q-Fantasy Pro</h1>
        <h3 className='welcome-message'> Welcome {managerName} </h3>
      </div>
      <NavigationMenu openModal={handleOpen}/>
      <SignInModal open={open} closeModal={handleClose}/>
    </header>
  );
}

export default Header;