const mongoose = require('mongoose');

// Define schema for FPL player data
const managerSchema = new mongoose.Schema({
  team_id: Number,
  first_name: String,
  second_name: String,
  team_name: String,
  fav_pl_team: String,
  or_points: Number,
  or_rank: Number,
  total_transfers: Number,
  teamValue : Number,
  gwPoints : Number,
  gwRank: Number,
  gwHits : Number,
  chipUsed : String,
  inTheBank : Number,
});

// Define model for FPL player data
const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;