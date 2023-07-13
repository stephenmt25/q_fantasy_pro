// Landing Page

import React, { useState, useEffect, useContext } from 'react';
import '../styles/LandingPage.css';
import HeroCard from '../components/HeroCard';
import MiniCard from '../components/MiniCard';
import { UserContext } from '../UserContext'

function LandingPage() {
  const [ data, setData ] = useState([])
  const { userId } = useContext(UserContext)

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
            <>
              <div className="landing-page-main-container">
                <div className='hero'>
                  <HeroCard allManagerData={data} focusedManager={userId} />
                </div>  
                <div className='mini-cards'>
                  <MiniCard title="leagues" linkTo='/qpl-standings'/>
                  <MiniCard title="awards" linkTo='/awards'/>
                </div>
              </div>
            </>
    </>
  )
}

export default LandingPage;