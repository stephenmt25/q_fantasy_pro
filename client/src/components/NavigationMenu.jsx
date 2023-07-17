import React, { useState, useEffect, useContext } from 'react';
import '../styles/NavigationMenu.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Link from '@mui/material/Link';
import { UserContext } from '../UserContext';

const NavigationMenu = ({ openModal, handleSignOut }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const { signedIn } = useContext(UserContext);

  const navButtons = [
    { title: 'Home', linkTo: '/' },
    { title: 'About', linkTo: '/about' },
    { title: 'Logout', linkTo: '' },
  ];

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener('resize', updateDimension);

    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, []);

  useEffect(() => {
    setIsMobile(screenSize.width <= 900);
  }, [screenSize]);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const mobileNav = (
    <div className="navButton">
      <Button onClick={toggleDrawer(true)}>
        <div className="menu-toggle">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </Button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ width: '200px' }} role="presentation">
          <List>
            {navButtons.map((button, index) => (
              <ListItem key={button.title} disablePadding>
                <ListItemButton component={Link} href={button.linkTo} underline="none">
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={button.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );

  const desktopNav = (
    <div className="desktopNav">
      <ul className="menu-items">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        {!signedIn && (
          <li className="sign-in">
            <a onClick={openModal}>Sign In</a>
          </li>
          )
        }
        {signedIn && (
          <li className="sign-out">
            <a onClick={handleSignOut}>Sign Out</a>
          </li>
          )
        }
      </ul>
    </div>
  );

  return (
    <>
      {isMobile ? mobileNav : desktopNav}
    </>
  );
};

export default NavigationMenu;
