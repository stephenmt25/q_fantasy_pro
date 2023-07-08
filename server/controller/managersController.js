const { TEAM_IDS } = require('../constants');
const mongoose = require('mongoose');
const Manager = require('../models/managerModel');

const uri = 'mongodb+srv://testUser1:testPassword@testcluster.praux9l.mongodb.net/?retryWrites=true&w=majority';

const options = TEAM_IDS.map((teamId) => {
  return (
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Origin: 'www.example.com',
        'X-Requested-With': 'www.example.com',
        'X-RapidAPI-Key': '6183c7843bmsha02424cbfcb6184p19fdbdjsn4e8dfb8f3784',
        'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com'
      },
      body: `{"url":"https://fantasy.premierleague.com/api/entry/${teamId}/"}`
    }
  );
});

// Set up mongoose connection to MongoDB cluster
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Fetch FPL player data from API and save to MongoDB
const fetchAndSaveData = async () => {
  const responses = await Promise.all(
    options.map(option =>
      fetch('https://http-cors-proxy.p.rapidapi.com/', option)
      .then(response => response.json()),
    )
  )
  const managers = responses.map((response, _i) => (
      {
        team_id: response.id,
        first_name: response.player_first_name,
        last_name: response.player_last_name,
        team_name: response.name
      }
    )
  );
  const updateManagerPromises = managers.map(manager => 
    Manager.updateMany({team_id: manager.team_id}, {
      team_id: manager.id,
      first_name: manager.first_name,
      last_name: manager.last_name,
      team_name: manager.name
    }, {upsert: true})
  );
  await Promise.all(updateManagerPromises);
  console.log('Managers Updated!');
};

module.exports = {
  fetchAndSaveData
};