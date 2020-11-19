CREATE OR REPLACE TRIGGER tr_remove_user_from_grp_proj BEFORE DELETE ON users (
  FOR EACH ROW
  EXECUTE PROCEDURE fn_remove_user_db_relations();
)
