import React, { useState, useEffect, useContext }  from "react";
import '../styles/StandingsPage.css';
import StandingsTable from "../components/StandingsTable";
import MyLoader from "../components/Loader";
import DataCards from "../components/DataCards";
import { UserContext } from "../UserContext";

function StandingsPage() {
  const [ standings, setStandings ] = useState([]);
  const { managerObj } = useContext(UserContext)
  console.log(managerObj)

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
        <DataCards managerData={managerObj}/>
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