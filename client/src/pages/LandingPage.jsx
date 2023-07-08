// Landing Page

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../styles/LandingPage.css';
import Header from '../components/Header';
import HeroCard from '../components/HeroCard';
import StandingsPage from '../components/StandingsTable'

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
              </div>
            </>
          }
        />
        <Route path="/about" element={
            <>
              <div className="landing-page-main-container">
                <h1>
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