const express = require('express');
const path = require('path');
const cors = require('cors');

const appRouter = express.Router();
const apiRouter = require('./api-router');

module.exports = (config) => {

  // CORS ENABLING
  appRouter.use(cors());
  // API
  appRouter.use('/api', apiRouter(config));

  // RETURN SPA
  appRouter.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

  return appRouter;
};
