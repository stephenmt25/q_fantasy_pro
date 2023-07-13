import { DataGrid } from '@mui/x-data-grid';

const StandingsTable = ({ standingsData }) => {
  // const gradient = 'linear-gradient(-45deg, rgba(232, 73, 0, 0.619) 0%, rgba(255, 0, 144, 0.547) 8%, rgba(35, 134, 170, 0.633) 90%, rgba(41, 255, 205, 0.731) 100%);'
  const handleRowClick = (params) => {

  };

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
        rows={standingsData.map((entry, index) => (
          {
            "id": index,
            "rank": entry.last_rank,
            "team name": entry.player_name,
            "manager name": entry.entry_name,
            "gameweek points": entry.event_total,
            "total points": entry.total
          }
        ))} 
        sx={{ 
          background: 'pink', 
          margin: '25px', 
          color: 'black',
          borderRadius: '27px',
          padding: '20px',
          fontFamily: 'Staatliches',
          fontSize: '20px'
        }}
        hideFooter
        disableColumnMenu
        onRowClick={handleRowClick} 
        />
  );
};

export default StandingsTable