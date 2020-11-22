const pool = require("../database/db_pool.js");

exports.create = async function(req, res) {
  try {

    const details = req.body;

    const newStory = await pool.query(
      `INSERT INTO user_stories(story_title, story_desc, proj_id)
      VALUES($1, $2, $3)
      RETURNING story_id;`
      , [details.story_title, details.story_desc, details.proj_id]);
    
    res.json(newStory.rows);

  } catch (err) {
    console.log(err.message);
  }
};

exports.find = async function(req, res) {
  try {
    const story_id = req.params.id;

    const story = await pool.query(`SELECT story_title,
                                            story_desc,
                                            created_date,
                                            updated_date,
                                            complete
                                    FROM user_stories
                                    WHERE story_id = $1;`, [story_id]);

    res.json(story.rows);

  } catch (err) {
    console.log(err.message);
  }
};

exports.update = async function(req, res) {
    try {

      const {id} = req.params;
      const details = req.body;

      const editedStory = await pool.query(`UPDATE user_stories SET story_title = $1,
                                            story_desc = $2,
                                            complete = $3
                                            WHERE story_id = $4;`
        , [details.story_title, details.story_desc, details.complete, id]);

      res.json("User story details updated");

    } catch (err) {
      console.log(err.message);
    }
};

exports.remove = async function(req, res) {
  try {
    const {id} = req.params;
    const deleteStory = await pool.query(`DELETE FROM user_stories
                                        WHERE story_id = $1;`, [id]);

    res.json("Story and associated tasks deleted");
  } catch (err) {
    console.log(err.message);
  }
};
