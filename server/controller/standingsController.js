const mongoose = require('mongoose');
const Standings = require('../models/standingsModel');

const uri = 'mongodb+srv://stephenmthomas95:ggmu%404464@qplcluster.ml7wrqt.mongodb.net/?retryWrites=true&w=majority';

const option = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Origin: 'www.example.com',
          'X-Requested-With': 'www.example.com',
          'X-RapidAPI-Key': '6183c7843bmsha02424cbfcb6184p19fdbdjsn4e8dfb8f3784',
          'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com'
        },
        body: `{"url":"https://fantasy.premierleague.com/api/leagues-classic/469503/standings/"}`
      };

// Set up mongoose connection to MongoDB cluster
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const fetchAndSaveData = async () => {
  const response = await (
    fetch('https://http-cors-proxy.p.rapidapi.com/', option)
      .then(response => response.json())
  );

  const entries = response.standings.results.map((entry, _i) => (
      {
        id: entry.id,
        event_total: entry.event_total,
        player_name: entry.player_name,
        rank: entry.rank,
        last_rank: entry.last_rank,
        rank_sort: entry.rank_sort,
        total: entry.total,
        entry: entry.entry,
        entry_name: entry.entry_name
      }
    )
  );
  const updateStandingsPromises = entries.map(entry => Standings.updateMany({id: entry.id}, { 
        id: entry.id,
        event_total: entry.event_total,
        player_name: entry.player_name,
        rank: entry.rank,
        last_rank: entry.last_rank,
        rank_sort: entry.rank_sort,
        total: entry.total,
        entry_name: entry.entry_name
  }, {upsert: true}))
  await Promise.all(updateStandingsPromises);
  console.log('Standings Updated!')
};



module.exports = {
  fetchAndSaveData
};