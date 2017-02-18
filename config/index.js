const nconf = require('nconf');
const path = require('path');
const fs = require('fs');

nconf.argv().env();
nconf.use('memory');

// ENVIRONMENT
if (!nconf.get('NODE_ENV')) {
  const environmentTypes = ['production', 'development', 'test'];
  const envArg = nconf.get('env');
  const env = environmentTypes.includes(envArg)
    ? envArg
    : 'development';
  nconf.set('NODE_ENV', env);
}

const filePath = path.join(__dirname, `./${nconf.get('NODE_ENV')}.json`);
if (fs.existsSync(filePath)) {
  nconf.file(filePath);
} else {
  return process.exit(0);
}
nconf.get('PORT') || nconf.set('PORT', nconf.get('app:port') || 3000);

module.exports = nconf;
