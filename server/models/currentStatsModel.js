const mongoose = require('mongoose');

const currentSeasonStatsSchema = new mongoose.Schema({
  id: Number,
  // teamStats: Object
});

const CurrentStats = mongoose.model('CurrentStats', currentSeasonStatsSchema);

module.exports = CurrentStats;