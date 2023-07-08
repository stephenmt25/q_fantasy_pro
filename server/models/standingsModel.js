const mongoose = require('mongoose');

// Define schema for FPL player data
const standingsSchema = new mongoose.Schema({
  id: Number,
  entry_name: String,
  event_total: Number,
  last_rank: Number,
  player_name: String,
  rank: Number,
  rank_sort: Number,
  total: Number,
});

// Define model for FPL player data
const Standings = mongoose.model('Standings', standingsSchema);

module.exports = Standings;