const express = require('express');
const path = require('path');
const cors = require('cors');
const favicon = require('serve-favicon');

const errorHandler = require('../middlewares/error-handler');


const appRouter = express.Router();
const apiRouter = require('./api-router');

// CORS ENABLING
appRouter.use(cors());
// API
appRouter.use('/api', apiRouter);
// ERROR HANDLER
appRouter.use(errorHandler);

// RETURN SPA
appRouter.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = appRouter;
