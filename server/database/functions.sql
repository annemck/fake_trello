CREATE OR REPLACE FUNCTION fn_replace_group_project_owner(deleted_user INTEGER)
RETURNS VOID AS '
  DECLARE
    replacement_user INTEGER;
    rec_project INTEGER;
    
    CURSOR cur_find_grp_projects(user_to_delete iNTEGER) FOR
      SELECT proj_id
      FROM projects
      WHERE user_id = user_to_delete
      AND collab = "Y";
    
  BEGIN
    OPEN cur_find_grp_projects(deleted_user);
    
      LOOP
      
        FETCH cur_find_grp_projects INTO rec_project;
        EXIT WHEN NOT FOUND;
        
        SELECT user_id INTO replacement_user
        FROM group_projects
        WHERE proj_id = rec_project.proj_id
        AND user_id != deleted_user
        LIMIT 1;
        
        UPDATE projects
        SET user_id = replacement_user
        WHERE proj_id rec_project.proj_id;
        
        DELETE group_projects
        WHERE proj_id = rec_project.proj_id
        AND user_id = replacement_user;
        
      END LOOP;
    CLOSE cur_find_grp_projects;
  END;'
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION fn_delete_user_from_group_projects(deleted_user INTEGER)
RETURNS VOID AS '
  BEGIN
    DELETE group_projects
    WHERE user_id = deleted_user;
  END;'
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION fn_delete_user_projects(deleted_user INTEGER)
RETURNS VOID AS '
  BEGIN
    DELETE projects
    WHERE user_id = deleted_user
    AND collab = "N";
  END;'
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION fn_remove_user_db_relations()
RETURNS TRIGGER AS $$
  DECLARE
    group_count INTEGER;
    
  BEGIN
    SELECT COUNT(collab) INTO group_count
    FROM projects
    WHERE user_id = old.user_id
    AND collab = 'Y';
    
    CASE WHEN group_count > 0 THEN
      PERFORM fn_replace_group_project_owner(old.user_id);
    END;
    
    PERFORM fn_delete_user_from_group_projects(old.user_id);
    PERFORM fn_delete_user_projects(old.user_id);
  END $$
LANGUAGE 'plpgsql';
