const Pool = require("pg").Pool;
const tables = require("./tables.js");
const makeTables = require("./create_tables.js");
const functions = require("./functions.js");
const triggers = require("./triggers.js");

const pool = new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5432, //default port
  database: "project_management"
});
  
const testUser = `INSERT INTO ${tables.table1} (user_email, first_name, last_name, user_password)
  VALUES('fake@email.fake', 'Another', 'User', 'password');`;

async function createDbObjects() {
  const client = await pool
    .connect()
    
    .catch(err => {
      console.log("pool .connect during table creation: ", err);
    });
  
  //check pg client is valid
  if (client !== undefined) {
    try {
      await client.query(`DROP TABLE IF EXISTS ${tables.table4};`);
      await client.query(`DROP TABLE IF EXISTS ${tables.table3};`);
      await client.query(`DROP TABLE IF EXISTS ${tables.table2};`);
      await client.query(`DROP TABLE IF EXISTS ${tables.table1};`);
      await client.query(`DROP EXTENSION IF EXISTS ${makeTables.extension};`);
      console.log("tables dropped");
      
    } catch (err){
      console.log("error during table drop: ", err);
    }
    
    try {
      await client.query(`CREATE EXTENSION ${makeTables.extension};`);
      await client.query(makeTables.newTable1);
      await client.query(makeTables.newTable2);
      await client.query(makeTables.newTable3);
      await client.query(makeTables.newTable4);
      
      console.log("tables created");
    
    } catch (err){
      console.log('error during table creation: ', err);
    }
    
    try{
      await client.query(functions.function1);
      await client.query(functions.function2);
      console.log("functions created");
      await client.query(triggers.dropTrigger1);
      await client.query(triggers.dropTrigger2);
      await client.query(triggers.createTrigger1);
      await client.query(triggers.createTrigger2);
      console.log("triggers created");
      
      await client.query(testUser);
    } catch (err) {
      console.log("error during function/trigger creation: ", err);
    }
    
    client.release();
    
  }
}


createDbObjects();

module.exports = pool;
