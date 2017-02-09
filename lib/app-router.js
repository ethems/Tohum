const express = require('express');
const path = require('path');
const cors = require('cors');

const appRouter = express.Router();
const apiRouter = require('./api-router');

// CORS ENABLING
appRouter.use(cors());
// API
appRouter.use('/api', apiRouter);

// RETURN SPA
appRouter.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = appRouter;
