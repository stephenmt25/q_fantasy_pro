import React, { useState, useEffect }  from "react";
import '../styles/StandingsTable.css';
import InfoCard from "./InfoCard";
import MyLoader from "./Loader";
import { DataGrid, GridCellParams } from '@mui/x-data-grid';

const StandingsTable = ( standingsData, updateFocusedManager, showInfo ) => {
  // Sort the FPL data by points
  const sortedData = standingsData?.sort((a, b) => b.total - a.total);

  return (
    <DataGrid columns={[
          {
            field: 'rank',
            headerName: 'Rank (prev)',
            description:
              'Manager Week as of last FPL Update',
            flex: 1
          },
          {
            field: 'manager name',
            headerName: 'Manager',
            description:
              'Name of Manager',
            flex: 1
          },
          {
            field: 'team name',
            headerName: 'Team',
            description:
              'FPL Team Name',
              flex: 1
          },
          {
            field: 'gameweek points',
            headerName: 'GW PTS',
            description:
              'Points gained in prev gameweek',
              flex: 1
          },
          {
            field: 'total points',
            headerName: 'Total',
            description:
              'Total accumulated points in the current season',
              flex: 1
          }
        ]}
        rows={sortedData.map((entry, index) => (
          {
            "id": index,
            "rank": entry.last_rank,
            "team name": entry.player_name,
            "manager name": entry.entry_name,
            "gameweek points": entry.event_total,
            "total points": entry.total
          }
        ))} 
        sx={{ background: "white", margin: '20px' }}
        hideFooter
        disableColumnMenu
        />
  );
};

function StandingsPage(props) {
  const [ focusedManager, setFocusedManager ] = useState('');
  const [ rank, setRank ] = useState('');
  const [ showInfo, setShowInfo ] = useState(false);
  const [ standings, setStandings ] = useState([]);

  useEffect(() => {
    fetch("/standingsData").then(
      response => response.json()
    ).then(
      data => {
        setStandings(data);
      }
    )
  }, [])

  const updateFocusedManager = (manager, index) => {
    return () => {
      setFocusedManager(manager);
      setRank(index);
      setShowInfo(true);

      if (showInfo && manager.id === focusedManager.id) {
        setShowInfo(false);
      }
    };
  };

  function onClose() {
    return () => {
      setShowInfo(false)
    }
  }

  return (
    <>
      {standings.length !== 0 
      ? 
      StandingsTable(standings, updateFocusedManager, showInfo)
      : 
      <MyLoader/>
      }
      {/* <InfoCard showInfo={showInfo} focusedManager={focusedManager} rank={rank} onClose={onClose}/> */}
    </>
  )
}

export default StandingsPage;  