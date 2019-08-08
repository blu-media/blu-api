const path = require("path");

// Import environment variables.
require('dotenv').config({ path: path.join(__dirname + '/.env') });

const config = {
  default: {
    database: {
      DB_URL: process.env.LOCAL_DB_URL
    },
    googleAuth: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
    },
    session: {
      SESSION_SECRET: process.env.SESSION_SECRET
    },
    client: {
      CLIENT_URL: process.env.DEV_CLIENT_URL
    }
  },
  production: {
    database: {
      DB_URL: process.env.STAGE_DB_URL
    },
    googleAuth: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
    },
    session: {
      SESSION_SECRET: process.env.SESSION_SECRET
    },
    client: {
      CLIENT_URL: process.env.STAGE_CLIENT_URL
    }
  }
}

const getConfig = (env) => {
  return config[env] || config.default;
}

module.exports = {
  getConfig
};
