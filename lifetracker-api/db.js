const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

const createDatabaseConnection = () => {
  if (process.env.NODE_ENV === "dev") {
    return new Client({ connectionString: getDatabaseUri() });
  }

  return new Client({
    connectionString: getDatabaseUri(),
  });
};

const db = createDatabaseConnection();
db.connect();
module.exports = db;
