const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database/db_pool.js");


app.use(cors());
app.use(express.json()); //req.body



app.post("/user", async(req, res) => {
  try {
    
    console.log(req.body);
    const body = req.body;
  
    const newUser = await pool.query("INSERT INTO users(user_email, first_name, last_name, user_password) VALUES($1, $2, $3, $4) RETURNING user_id", [body.user_email, body.first_name, body.last_name, body.user_password]);
    
    res.json(newUser.rows);
    
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/user/:id", async(req, res) => {
  try {
    
    const {id} = req.params;
    
    const user = await pool.query("SELECT user_email, first_name, last_name FROM users WHERE user_id = $1", [id]);
    
    res.json(user.rows);
    
  } catch {
    console.log(err.message);
  }
});




app.listen(5000, () => {
  console.log("server has started on port 5000");
});
