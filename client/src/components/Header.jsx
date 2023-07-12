import React from 'react';
import '../styles/Header.css'
import NavigationMenu from './NavigationMenu';
import SignInModal from './SignInModal';

function Header({ setManagerId, managerName }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function updateManager(id) {
    setManagerId(id)
    console.log(id);
  }

  return (
    <header className='r1'>
      <div className='header-text'>
        <h1 className='application-name'>Q-Fantasy Pro</h1>
        <h3 className='welcome-message'> Welcome {managerName} </h3>
      </div>
      <NavigationMenu openModal={handleOpen}/>
      <SignInModal open={open} closeModal={handleClose} setUserId={updateManager}/>
    </header>
  );
}

export default Header;