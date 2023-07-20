import React, { useEffect, useState } from 'react';
import '../styles/DataCards.css';
import BarChart from './BarChart';
import createManagerObj from '../funcs/createManagerObj';
import { oldData } from '../constants';
// import BasicSelect from './BasicSelector';
// import TitleStats from './TitleStats';
// import StandingsTable from './StandingsTable';

const DataCards = ({ managerId, standings, setFocusedMgr }) => {
  const [ focusedManager, setFocusedManager ] = useState(createManagerObj(managerId));
  const [ showGWDetails, setShowGWDetails ] =  useState(false);
  const [ gwDetails, setGwDetails ] = useState({})
  
  useEffect(() => {
    setFocusedManager(createManagerObj(managerId));
  }, [managerId]);

  function showDetails(gameweek) {
    const gw = gameweek - 1 
    const id = focusedManager.id
    const managerPerf = oldData.filter(obj => obj.id === id);
    const filteredArray1 = managerPerf.filter(Boolean);
    const gwDetails = filteredArray1[0].stats[id].current[gw];

    setShowGWDetails(true)
    setGwDetails(gwDetails)
  }

  const abbrNum = (number, decPlaces) => {
    decPlaces = 10 ** decPlaces;
    const abbrev = ['k', 'm', 'b', 't'];

    for (let i = abbrev.length - 1; i >= 0; i--) {
      const size = 10 ** ((i + 1) * 3);
      if (size <= number) {
        number = Math.round((number * decPlaces) / size) / decPlaces;
        if (number === 1000 && i < abbrev.length - 1) {
          number = 1;
          i++;
        }
        number += abbrev[i];
        break;
      }
    }
    return number;
  };

  const getOrdinal = (n) => {
    let ord = 'th';

    if (n % 10 === 1 && n % 100 !== 11) {
      ord = 'st';
    } else if (n % 10 === 2 && n % 100 !== 12) {
      ord = 'nd';
    } else if (n % 10 === 3 && n % 100 !== 13) {
      ord = 'rd';
    }
    return ord;
  };

  const cardData = [
    {
      desc: 'QPL Rank',
      data: `${focusedManager.qpl_rank}${getOrdinal(focusedManager.qpl_rank)}`,
    },
    {
      desc: 'Overall Rank',
      data: abbrNum(focusedManager.overall_rank, 0),
    },
    {
      desc: 'GW Rank',
      data: abbrNum(focusedManager.last_gw_rank, 0),
    },
    {
      desc: 'GW Point High',
      data: 126, //managerData.highest_pts
    },
    {
      desc: 'Team Value',
      data: focusedManager.team_value / 10,
    },
  ];

  return (
    <div className="data-cards" style={{ gridTemplateRows: "1fr 1fr 1fr"}}>
      <div className="row1">
        <div className='card-full'>
          <span className="card-description">Team Name</span>
          <div className="name-card" style={{ width:'max-content', minWidth: '300px'}}>         
          <span className='team-name'>
            {focusedManager.team_name}
          </span>
          <span className='manager-name'>
            {focusedManager.manager_name}
          </span>
        </div>
      </div>   
      </div>
      <div className="row2">
        {cardData.map((card, index) => (
          <div className='card-full'>
            <span className="data-description">{card.desc}</span>
            <div className="tiny-card" key={index} style={{ width:'min-content', marginTop:'0px'}}>
              <div className="main-data">{card.data}</div>
            </div>
          </div>

        ))}
      </div>
      <div className='row3' style={{ gridTemplateColumns: '1fr 1fr', display: 'grid'}}>
        <div className='card-full'>
          <span className="card-description">Gameweek Points</span>
          <div className="main-card">
            {/* <BasicSelect/> */}
            <BarChart showDetails={showDetails}/>
          </div>
        </div>
        {showGWDetails &&
        <div className='card-full'>
          <span className="card-description">Gameweek Details</span>
          <div className="gw-details-card">
              <span>
                Points in GW {gwDetails.event}  :        
                <span style={{ color:"orange" }}>
                  {gwDetails.points} 
                </span>
              </span>
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default DataCards;
