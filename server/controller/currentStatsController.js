const mongoose = require('mongoose');
const CurrentStats = require('../models/currentStatsModel');
const { TEAM_IDS } = require('../constants');

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
      body: `{"url":"https://fantasy.premierleague.com/api/entry/${teamId}/history/"}`
    }
  );
});

// Set up mongoose connection to MongoDB cluster
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const fetchAndSaveData = async () => {
  const responses = await Promise.all(
    options.map(option =>
      fetch('https://http-cors-proxy.p.rapidapi.com/', option)
      .then(response => response.json()),
      )
  );

  const currentSeasonStats = TEAM_IDS.map((teamId, i) => {
      var obj = {};
      obj[teamId] = responses[i];
      return obj;
    }
  );

  const updateCurrentStatsPromises = currentSeasonStats.map((teamStats, i) => {
    let teamId = Object.keys(teamStats)[0];
    CurrentStats.updateMany(
      { id: teamId },
      { 
        id: teamId,
        // teamStats: teamStats[`${teamId}`]
      },
      { upsert: true }
    );
  })
  await Promise.all(updateCurrentStatsPromises);
  console.log('CurrentStats Updated!')
};

module.exports = {
  fetchAndSaveData
};