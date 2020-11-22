const pool = require("../database/db_pool.js");

exports.create = async function(req, res) {
  try {

    const details = req.body;

    const newProject = await pool.query(
      `INSERT INTO projects(proj_name, proj_desc, user_id)
      VALUES($1, $2, $3)
      RETURNING proj_id`
      , [details.proj_name, details.proj_desc, details.user_id]);
      
    console.log('post function running');
    
    res.json(newProject.rows);

  } catch (err) {
    console.log(err.message);
  }
};

exports.find = async function(req, res) {
  try {
    const project_id = req.params.id;

    const project = await pool.query(`SELECT proj_name, proj_desc
                                    FROM projects
                                    WHERE proj_id = $1`, [project_id]);

    console.log("find function running");

    res.json(project.rows);

  } catch (err) {
    console.log(err.message);
  }
}

exports.update = async function(req, res) {
    try {

      const {id} = req.params;
      const details = req.body;
      console.log(id);

      const editedProject = await pool.query(`UPDATE projects SET proj_name = $1,
                                            proj_desc = $2
                                            WHERE proj_id = $3`
        , [details.proj_name, details.proj_desc, id]);

      res.json("Project details updated");

    } catch (err) {
      console.log(err.message);
    }
}
//
// exports.remove = async function(req, res) {
//   try {
//     const {id} = req.params;
//     const deleteProject = await pool.query(`DELETE FROM projects
//                                         WHERE proj_id = $1;`, [id]);
//
//     res.json("Project and associated tasks deleted");
//   } catch (err) {
//     console.log(err.message);
//   }
// }
