const { qpl23, oldData } = require('../constants');

// future implementation, .. get manager id as parameter and fetch from fpl api

function createManagerObj(id, gameweek = 38) {
  const gw = gameweek - 1;
  const managerArray = qpl23.filter(obj => obj.id === id);
  const managerPerf = oldData.filter(obj => obj.id === id);
  const filteredArray1 = managerArray.filter(Boolean);
  const filteredArray2 = managerPerf.filter(Boolean);
  const obj = {
    id: filteredArray1[0]?.id,
    manager_name: filteredArray1[0]?.player_name,
    team_name: filteredArray1[0]?.entry_name,
    qpl_rank: filteredArray1[0]?.last_rank,
    overall_rank: filteredArray2[0]?.stats[id]?.current[gw]?.overall_rank,
    total_pts: filteredArray1[0]?.total,
    chips_used: filteredArray2[0]?.stats[id]?.chips,
    last_gw_rank: filteredArray2[0]?.stats[id]?.current[gw]?.rank,
    team_value: filteredArray2[0]?.stats[id]?.current[gw]?.value,
  };
  return obj;
}


export default createManagerObj