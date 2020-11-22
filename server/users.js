// const express = require("express");
// const app = express();
// const cors = require("cors");
// const pool = require("./database/db_pool.js");
//
//
// app.use(cors());
// app.use(express.json()); //req.body
//
//
// 
// app.post("/user", async(req, res) => {
//   try {
//
//     const details = req.body;
//
//     const newUser = await pool.query(
//       "INSERT INTO users(user_email, first_name, last_name, user_password) VALUES($1, $2, $3, $4) RETURNING user_id"
//       , [details.user_email, details.first_name, details.last_name, details.user_password]);
//
//     res.json(newUser.rows);
//
//   } catch (err) {
//     console.log(err.message);
//   }
// });
//
// app.get("/user/:id", async(req, res) => {
//   try {
//
//     const {id} = req.params;
//
//     const user = await pool.query(
//       "SELECT user_email, first_name, last_name FROM users WHERE user_id = $1"
//       , [id]);
//
//     res.json(user.rows);
//
//   } catch {
//     console.log(err.message);
//   }
// });
//
// app.put("/user/:id", async(req, res) => {
//   try {
//
//     const {id} = req.params;
//     const details = req.body;
//
//     console.log(details);
//     const updateUserDetails = await pool.query(
//       "UPDATE users SET user_email = $1, first_name = $2, last_name = $3, user_password = $4 WHERE user_id = $5"
//       , [details.user_email, details.first_name, details.last_name, details.user_password, id]);
//
//     res.json("User details updated");
//
//   } catch (err) {
//     console.log(err.message);
//   }
// });
//
//
//
// app.listen(5000, () => {
//   console.log("server has started on port 5000");
// });
