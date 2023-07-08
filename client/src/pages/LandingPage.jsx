// Landing Page

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../styles/LandingPage.css';
import Header from '../components/Header';
import HeroCard from '../components/HeroCard';
import StandingsPage from '../components/StandingsTable'
import MiniCard from '../components/MiniCard';
import leagueImage from '../images/leagues.png';
import awardsImage from '../images/qplLogo.jpg'

function LandingPage() {
  return (
    <>
      <Routes>
        <Route path="/" element={
            <>
              <div className="landing-page-main-container">
                <Header/>
                <div className='hero'>
                  <HeroCard/>
                </div>  
                <div className='mini-cards'>
                  <MiniCard title="leagues" image={leagueImage} linkTo='/qpl-standings'/>
                  <MiniCard title="awards" image={awardsImage} linkTo='/awards'/>
                </div>
              </div>
            </>
          }
        />
        <Route path="/about" element={
            <>
              <div className="about-page-main-container">
                <Header/> 
                <h1 className='temp'>
                  This is an about page
                </h1> 
              </div>
            </>
          }
        />
        <Route path="/qpl-standings" element={
          <>
            <div className="standings-page-main-container">
              <Header/>
              <StandingsPage/>
            </div>
          </>
          
          } />
      </Routes>
    </>
  )
}

export default LandingPage;