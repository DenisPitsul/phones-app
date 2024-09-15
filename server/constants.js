const path = require('path');

const CONSTANTS = {
  STATIC_PATH: path.join(__dirname, process.env.STATIC_FOLDER),
};

module.exports = CONSTANTS;
