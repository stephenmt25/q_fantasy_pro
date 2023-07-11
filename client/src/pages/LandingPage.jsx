// Landing Page

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../styles/LandingPage.css';
import Header from '../components/Header';
import HeroCard from '../components/HeroCard';
import StandingsPage from '../components/StandingsTable'
import MiniCard from '../components/MiniCard';
import leagueImage from '../images/leagues.png';
import awardsImage from '../images/qplLogo.jpg';

function LandingPage() {
  const [ data, setData ] = useState([])

  useEffect(() => {
    fetch("/statsData").then(
      response => response.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={
            <>
              <div className="landing-page-main-container">
                <Header/>
                <div className='hero'>
                  <HeroCard managerData={data}/>
                </div>  
                <div className='mini-cards'>
                  <MiniCard title="leagues" linkTo='/qpl-standings'/>
                  <MiniCard title="awards" linkTo='/awards'/>
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