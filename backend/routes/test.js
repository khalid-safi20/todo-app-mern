const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/db-test', async (req, res) => {
  try {
    const state = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.status(200).json({
      status: states[state],
      state: state,
      uri: process.env.MONGO_URI ? 'URI is set' : 'URI not set',
      env: process.env.NODE_ENV
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// In backend/routes/test.js
router.get('/simple-test', async (req, res) => {
  try {
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    res.status(200).json({ message: 'Connected successfully!' });
    await client.close();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;