import React, { useState, useEffect }  from "react";
import '../styles/StandingsPage.css';
import StandingsTable from "../components/StandingsTable";
import MyLoader from "../components/Loader";

function StandingsPage() {
  const [ standings, setStandings ] = useState([]);

  useEffect(() => {
    fetch("/standingsData").then(
      response => response.json()
    ).then(
      data => {
        setStandings(data.sort((a,b) => b.total - a.total));
      }
    )
  }, [])

  return (
    <>
      <div className="standings-page-container">
        <div className="data-cards">
          <div className="row1">
            {[1,2,3,4,5].map(i => 
              <div className="tiny-card">
                <div className="main-data">7th</div>
                <span className="data-description">QPL Rank</span>
              </div>
            )}
          </div>
          <div className="row2">
              <div className="main-card">

              </div>
              <div className="secondary-card">

              </div>
          </div>
        </div>
        {
          standings.length !== 0 
            ? 
            <StandingsTable standingsData={standings}/>
            : 
            <MyLoader id="loader"/>
        }
      </div>
    </>
  )
}

export default StandingsPage;  