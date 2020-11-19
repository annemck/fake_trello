CREATE TRIGGER tg_secure_password BEFORE INSERT OR UPDATE OF user_password
ON users
FOR EACH ROW
EXECUTE PROCEDURE fn_hash_password();
