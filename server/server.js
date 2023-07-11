const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

// const managerController = require('./controller/managersController');
// const standingsController = require('./controller/standingsController');
// const currentStatsController =  require('./controller/currentStatsController');

const app = express();
// const dbUri = 'mongodb+srv://testUser1:testPassword@testcluster.praux9l.mongodb.net/test.managers?retryWrites=true&w=majority';
const clusterUri = 'mongodb+srv://stephenmthomas95:ggmu4464@qplcluster.ml7wrqt.mongodb.net/?retryWrites=true&w=majority';
// const client = new MongoClient(clusterUri, { useNewUrlParser: true, useUnifiedTopology: true });
// const managers_collection = client.db('test').collection('managers');


const client = new MongoClient(clusterUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const standings_collection = client.db('qplDatabase').collection('standings');
const stats_collection = client.db('qplDatabase').collection('qplTeamStats');

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

// async function connect() {
//   try {
//     await mongoose.connect(clusterUri);
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error(error);
//   }
// }

// Connecting to mongoose
// connect();

//Fetching Manager Data and updating MongoDB
// managerController.fetchAndSaveData();
//Fetching Standings Data and updating MongoDb
// standingsController.fetchAndSaveData();
//Fetching weekly stats
// currentStatsController.fetchAndSaveData();

//API Endpoints
// app.get('/managerData', (req, res) => {
//   managers_collection.find().toArray()
//     .then(data => {
//       console.log('Manager Data Fetched')
//       res.json(data);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

app.get('/standingsData', (req,res) => {
  standings_collection.find().toArray()
    .then(data => {
      console.log('Standings Data Fetched');
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
})

app.get('/statsData', (req,res) => {
  stats_collection.find().toArray()
    .then(data => {
      console.log('Stats Data Fetched');
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
})

//Starting the Server
app.listen(8000, () => {
  console.log(`Server listening on port 8000`);
});