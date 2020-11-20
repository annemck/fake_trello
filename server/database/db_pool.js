const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5432, //default port
  database: "project_management"
});

module.exports = pool;
