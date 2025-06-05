const dotEnv = require("dotenv");

const env = process.env.NODE_ENV || dev;

if (env !== "prod") {
  let envPath = `./.env.${env}`;
  let res = dotEnv.config({ path: envPath });
  if (res.error) {
    console.log("Unable to load env file !!");
    process.env.exit();
  }
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  APP_SECRET: process.env.APP_SECRET,
};
