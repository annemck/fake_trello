const function1 = "fn_hash_password";
const function2 = "fn_create_update_date";

module.exports = {
  function1: `CREATE OR REPLACE FUNCTION ${function1}()
              RETURNS trigger AS $$
                BEGIN
                  IF length(new.user_password) < 8 THEN
                    RAISE EXCEPTION 'Password must be at least 8 characters.';
                  ELSE
                    new.user_password := crypt(new.user_password, gen_salt('bf'));
                    RETURN NEW;
                  END IF;
                END $$
              LANGUAGE 'plpgsql';`,
              
  function2: `CREATE OR REPLACE FUNCTION ${function2}()
              RETURNS trigger AS $$
                BEGIN
                  new.updated_date = current_date;
                  RETURN NEW;
                END $$
              LANGUAGE 'plpgsql';`
}
