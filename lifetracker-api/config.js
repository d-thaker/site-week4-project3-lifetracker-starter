require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;
const IS_TESTING = process.env.NODE_ENV === "test";

function getDatabaseUri() {
  const dbUser = process.env.DATABASE_USER || "postgres";
  const dbPass = process.env.DATABASE_PASS
    ? encodeURI(process.env.DATABASE_PASS)
    : "postgres";
  const dbHost = process.env.DATABASE_HOST || "local";
  const dbPort = process.env.DATABASE_PORT || 5432;
  const dbTestName = process.env.DATABASE_TEST_NAME || "lifetracker_test";
  const dbProdName = process.env.DATABASE_NAME || "lifetracker";
  const dbName = process.env.NODE_ENV === "test" ? dbTestName : dbProdName;

  return (
    process.env.DATABASE_URL ||
    `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
  );
}

const BCRYPT_WORK_FACTOR = IS_TESTING ? 1 : 13;

console.log("Life Tracker backend as config follows:");
console.log("SECRET_KEY:", SECRET_KEY);
console.log("PORT:", PORT.toString());
console.log("BCRYPT_WORK_FACTOR", BCRYPT_WORK_FACTOR);
console.log("Database:", getDatabaseUri());

module.exports = {
  IS_TESTING,
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
