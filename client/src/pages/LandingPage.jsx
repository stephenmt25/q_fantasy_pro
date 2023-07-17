import React, { useState, useEffect, useContext } from 'react';
import '../styles/LandingPage.css';
import HeroCard from '../components/HeroCard';
import { UserContext } from '../UserContext';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const LandingPage = () => {
  const [data, setData] = useState([]);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    fetch("/statsData")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="landing-page-main-container">
      <div className="hero-container">
        <HeroCard allManagerData={data} focusedManager={userId} />
        <div className='main-text'>
          <span style={{"fontSize": "80px"}}>
            Visualize
          </span>
          <span>
            FPL Mini-League
          </span>
          <span style={{"fontSize": "80px"}}>
            Data
          </span>
        </div>
      </div>
      <div className="mini-cards">
        <div className='links'>
          <div className='link register'>
            <a href='/register' className='link-text'>
              Register
            </a>
          </div>
          <div className='link vote'>
            <a href='vote' className='link-text'>
              Vote
            </a>
          </div>
          <div className='link legacy'>
            <a href='legacy' className='link-text'>
              Legacy Stats
            </a>
          </div>
        </div>
        <a href='/qpl-standings' className='cta'>
          <span className='text'>Analyze</span>
          <ArrowOutwardIcon className='arrow-icon' style={{"fontSize" : "90px"}}></ArrowOutwardIcon>
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
