const pool = require("../database/db_pool.js");

exports.create = async function(req, res) {
  try {

    const details = req.body;

    const newTask = await pool.query(
      `INSERT INTO tasks(proj_id, task_title, task_desc, task_notes, story_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING task_id;`
      , [details.proj_id, details.task_title, details.task_desc, details.task_notes, details.story_id]);
    
    res.json(newTask.rows);

  } catch (err) {
    console.log(err.message);
  }
};

exports.find = async function(req, res) {
  try {
    const task_id = req.params.id;

    const task = await pool.query(`SELECT task_title,
                                            task_desc,
                                            task_notes,
                                            created_date,
                                            updated_date,
                                            task_position
                                    FROM tasks
                                    WHERE task_id = $1;`, [task_id]);

    res.json(task.rows);

  } catch (err) {
    console.log(err.message);
  }
};
