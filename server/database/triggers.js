const tables = require("./tables.js");
const function1 = "fn_hash_password";
const trigger1 = "tg_secure_password";
const function2 = "fn_create_update_date";
const trigger2 = "tg_set_update_date";

module.exports = {
  dropTrigger1: `DROP TRIGGER IF EXISTS ${trigger1} ON ${tables.table1};`,
  createTrigger1: `CREATE TRIGGER ${trigger1}
                  BEFORE INSERT OR UPDATE OF user_password
                  ON ${tables.table1}
                  FOR EACH ROW
                  EXECUTE PROCEDURE ${function1}();`,
              
  dropTrigger2: `DROP TRIGGER IF EXISTS ${trigger2} ON ${tables.table3};`,
  createTrigger2: `CREATE TRIGGER ${trigger2}
                  BEFORE UPDATE ON ${tables.table3}
                  FOR EACH ROW
                  EXECUTE PROCEDURE ${function2}();`
}
