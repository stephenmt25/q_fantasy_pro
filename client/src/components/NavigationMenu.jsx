import React, { useState, useEffect } from 'react';
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

function NavigationMenu() {
  const [state, setState] = useState(false)
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension(){
      return {
          width: window.innerWidth,
          height: window.innerHeight
      }
  }

  useEffect(() => {
    const updateDimension = () => {
        setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);


    return(() => {
        window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize])

  const toggleDrawer = (action) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(action === 'open' ? true : false);
  };

  const mobileNav = (
    <div className='navButton'>
      <Button onClick={toggleDrawer('open')}>
        {
          <div className="menu-toggle">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        }
      </Button>
      <Drawer
        anchor={'right'}
        open={state}
        onClose={toggleDrawer('close')}
      >
        {<Box
            sx={{ width: '200px' }}
            role="presentation"
            onClick={toggleDrawer('close')}
            onKeyDown={toggleDrawer('close')}
          >
            <List>
              {['Home', 'About', 'Profile', 'Logout'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
        </Box>}
      </Drawer>
    </div> 
  )

  const desktopNav = (
    <div className='desktopNav'>
      <ul className="menu-items">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/profile">Profile</a></li>
      <li><a href="/qpl-standings">QPL Table</a></li>
      </ul>
    </div> 
  )

  const isMobile = screenSize.width <= 900;

  return (
    <>
      {isMobile ? mobileNav : desktopNav}
    </>
  );
}

export default NavigationMenu;