CREATE OR REPLACE FUNCTION fn_hash_password()
RETURNS trigger AS '
  BEGIN
    new.user_password := crypt(new.user_password, gen_salt(''bf''));
    RETURN NEW;
  END'
LANGUAGE 'plpgsql';
