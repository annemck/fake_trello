const pool = require("../database/db_pool.js");

exports.create = async function(req, res) {
  try {

    const details = req.body;

    const newUser = await pool.query(
      `INSERT INTO users(user_email, first_name, last_name, user_password)
      VALUES($1, $2, $3, $4)
      RETURNING user_id;`
      , [details.user_email, details.first_name, details.last_name, details.user_password]);
    
    res.json(newUser.rows);

  } catch (err) {
    console.log(err.message);
  }
};

exports.find = async function(req, res) {
  try {
    const user_id = req.params.id;

    const user = await pool.query(`SELECT user_email, first_name, last_name
                          FROM users
                          WHERE user_id = $1;`, [user_id]);
    
    res.json(user.rows);
    
  } catch (err) {
    console.log(err.message);
  }
}

exports.update = async function(req, res) {
    try {
  
      const {id} = req.params;
      const details = req.body;

      const editedUser = await pool.query(`UPDATE users SET user_email = $1,
                                first_name = $2,
                                last_name = $3,
                                user_password = $4
                                WHERE user_id = $5;`
        , [details.user_email, details.first_name, details.last_name, details.user_password, id]);
  
      res.json("User details updated");
  
    } catch (err) {
      console.log(err.message);
    }
}

exports.remove = async function(req, res) {
  try {
    const {id} = req.params;
    const deleteUser = await pool.query(`DELETE FROM users
                                        WHERE user_id = $1;`, [id]);
                                        
    res.json("User deleted");
  } catch (err) {
    console.log(err.message);
  }
}
