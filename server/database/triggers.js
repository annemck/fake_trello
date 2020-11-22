const tables = require("./tables.js");
const function1 = "fn_hash_password";
const trigger1 = "tg_secure_password";

module.exports = {
  dropTrigger1: `DROP TRIGGER IF EXISTS ${trigger1} ON ${tables.table1};`,
  createTrigger1: `CREATE TRIGGER ${trigger1} BEFORE INSERT OR UPDATE OF user_password
              ON ${tables.table1}
              FOR EACH ROW
              EXECUTE PROCEDURE ${function1}();`
}
