import React, { useContext, useEffect, useState } from 'react';
import '../styles/Header.css';
import NavigationMenu from './NavigationMenu';
import SignInModal from './SignInModal';
import { UserContext } from '../UserContext';

const Header = () => {
  const { signedIn, managerObj, setSignedIn } = useContext(UserContext);
  const [open, setOpen] = useState(!signedIn);
  const [openInfo, setOpenInfo] = useState(false)

  useEffect(() => {
    if (signedIn) {
      setOpen(false);
    }
  }, [signedIn]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    setSignedIn(false);
    setOpenInfo(true);
  }

  const handleCloseInfo = () => {
    setOpenInfo(false);
  }

  const name = signedIn ? managerObj.manager_name : 'Manager';

  return (
    <header className="r1">
      <div className="header-text">
        <h1 className="application-name">Q-Fantasy Pro</h1>
        <h3 className="welcome-message"> Welcome {name} </h3>
      </div>
      <NavigationMenu openModal={handleOpen} handleSignOut={handleSignOut} />
      <SignInModal open={open} closeModal={handleClose} openInfoSnackbar={openInfo} handleCloseInfo={handleCloseInfo}/>
    </header>
  );
};

export default Header;
