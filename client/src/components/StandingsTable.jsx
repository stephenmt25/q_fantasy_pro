import { DataGrid } from '@mui/x-data-grid';

const StandingsTable = ({ standingsData, setFocusedManager }) => {
  const handleRowClick = (params) => {
    setFocusedManager(params.id)
  };

  const columns = [
    {
      field: 'rank',
      headerName: 'Rank (prev)',
      description: 'Manager Week as of last FPL Update',
      flex: 1,
    },
    {
      field: 'managerName',
      headerName: 'Manager',
      description: 'Name of Manager',
      flex: 1,
    },
    {
      field: 'teamName',
      headerName: 'Team',
      description: 'FPL Team Name',
      flex: 1,
    },
    {
      field: 'gameweekPoints',
      headerName: 'GW PTS',
      description: 'Points gained in prev gameweek',
      flex: 1,
    },
    {
      field: 'totalPoints',
      headerName: 'Total',
      description: 'Total accumulated points in the current season',
      flex: 1,
    },
  ];

  const rows = standingsData.map((entry, index) => ({
    id: entry.id,
    rank: entry.last_rank,
    teamName: entry.entry_name,
    managerName: entry.player_name,
    gameweekPoints: entry.event_total,
    totalPoints: entry.total,
  }));

  return (
    <div>
      <span
        style={{
          fontSize: "17px",
          textAlign: "center",
          color: "white",
          margin: "0px 7.5px 0px 7.5px",
          fontFamily: "Jost",
        }}
      >
        QPL Standings
      </span>
      <DataGrid
        columns={columns}
        rows={rows}
        sx={{
          background: 'pink',
          margin: '0 25px 0 0',
          color: 'black',
          borderRadius: '27px',
          padding: '20px',
          fontFamily: 'Staatliches',
          fontSize: '20px',
        }}
        hideFooter
        disableColumnMenu
        onRowClick={handleRowClick}
      />
    </div>
    
  );
};

export default StandingsTable;
