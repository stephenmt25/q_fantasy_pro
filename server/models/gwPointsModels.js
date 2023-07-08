const mongoose = require('mongoose');
// const { TEAM_IDS } = require('../constants');

// Define schema for FPL player data
const gwPointsSchema = new mongoose.Schema({
  
});

// Define model for FPL player data
const gwPoints = mongoose.model('gwPoints', gwPointsSchema);

module.exports = gwPoints;