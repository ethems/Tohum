const path = require('path');
const fs = require('fs');

module.exports = () => {
  const filePath = path.join(__dirname, `./${process.env.NODE_ENV}.json`);
  try {
    fs.accessSync(filePath, fs.F_OK);
  } catch (e) {
    return process.exit(0);
  }
  const configJson = JSON.parse(fs.readFileSync(filePath));
  const runtimeConfig = {};

  runtimeConfig.serverPort = process.env.PORT || configJson.serverPort || 3000;
  runtimeConfig.dbUri = configJson.dbUri;
  runtimeConfig.siteRoot = `/${configJson.siteRoot}`;


  return runtimeConfig;
};
