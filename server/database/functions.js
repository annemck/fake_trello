const function1 = "fn_hash_password";

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
              LANGUAGE 'plpgsql';`
}
