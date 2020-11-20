const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database/db_pool.js");


app.use(cors());
app.use(express.json()); //req.body



app.get("/users/:id", async(req, res) => {
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
