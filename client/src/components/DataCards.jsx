import React, { useEffect, useState } from 'react';
import '../styles/DataCards.css';
import BarChart from './BarChart';
import createManagerObj from '../funcs/createManagerObj'

const DataCards = ({ managerId }) => {
  const [ focusedManager, setFocusedManager ] = useState(createManagerObj(managerId));
  
  useEffect(() => {
    setFocusedManager(createManagerObj(managerId));
  }, [managerId]);

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
    <div className="data-cards">
      <div className="row1">
        <div className="name-card">         
          <span className='team-name'>
            {focusedManager.team_name}
          </span>
          <span className='manager-name'>
            {focusedManager.manager_name}
          </span>
        </div>
        <div className="main-card">
          <BarChart/>
        </div>
        <div className="secondary-card"></div>
      </div>
      <div className="row2">
        {cardData.map((card, index) => (
          <div className="tiny-card" key={index}>
            <div className="main-data">{card.data}</div>
            <span className="data-description">{card.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataCards;
