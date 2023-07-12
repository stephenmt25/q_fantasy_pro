// Landing Page

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../styles/LandingPage.css';
import Header from '../components/Header';
import HeroCard from '../components/HeroCard';
import StandingsPage from '../components/StandingsTable'
import MiniCard from '../components/MiniCard';
const { qpl23, oldData, TEAM_IDS } = require('../constants');

function LandingPage() {
  const [ data, setData ] = useState([])
  const [ managerId, setManagerId ] = useState(457790)
  const [ managersInfo, setManagersInfo ] = useState(qpl23)

  useEffect(() => {
    fetch("/statsData").then(
      response => response.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])

  function getManagerName(id) {
    let  manager = managersInfo.map(obj => {
      if (obj.id === id) {
        return obj.player_name
      }
    })
    return manager
  }

  const managerName = getManagerName(managerId)

  return (
    <>
      <Routes>
        <Route path="/" element={
            <>
              <div className="landing-page-main-container">
                <Header setManagerId={setManagerId} managerName={managerName}/>
                <div className='hero'>
                  <HeroCard allManagerData={data} focusedManager={managerId} />
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