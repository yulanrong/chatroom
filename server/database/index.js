const { Pool } = require("pg");

const pool = new Pool({
  user: "yr",
  host: "localhost",
  database: "chatroomdb",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("error", (err, client) => {
  console.log("error on idle postgres pool", err);
  process.exit(-1);
});

module.exports.pool = pool;
