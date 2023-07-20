import React, { useState, useEffect, useContext }  from "react";
import '../styles/StandingsPage.css';
import StandingsTable from "../components/StandingsTable";
import MyLoader from "../components/Loader";
import DataCards from "../components/DataCards";
import { UserContext } from "../UserContext";

function StandingsPage() {
  const [ standings, setStandings ] = useState([]);
  const { managerObj } = useContext(UserContext)
  const [ managerId, setManagerId ] = useState(managerObj.id)
  const [ fr, setFr ] = useState('1fr 3fr')

  useEffect(() => {
    setManagerId(managerObj.id);
  }, [managerObj]);

  function setFocusedManager(id) {
    setManagerId(id);
    setFr('1fr 1fr')
  }

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
      <div className="standings-page-container" style={{ gridTemplateColumns: `${fr}`}}>
        <DataCards managerId={managerId}/>
        {
          standings.length !== 0 
            ? 
            <StandingsTable standingsData={standings} setFocusedManager={setFocusedManager}/>
            : 
            <MyLoader id="loader"/>
        }
      </div>
    </>
  )
}

export default StandingsPage;  