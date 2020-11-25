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

exports.findByLogin = async function(req, res) {
  try {
    const userEmail = req.params.email;
    const userPassword = req.params.password;
    
    const user = await pool.query(`SELECT first_name, last_name, user_id
                          FROM users
                          WHERE user_email = $1
                          AND user_password = crypt($2, user_password)`, [userEmail, userPassword]);
    res.json(user.rows);
    
  } catch (err) {
    console.log(err.message);
  }
}

exports.findById = async function(req, res) {
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
      
      console.log(req.body);

      const editedUser = await pool.query(`UPDATE users SET user_email = $1,
                                first_name = $2,
                                last_name = $3,
                                user_password = crypt($4, user_password)
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
