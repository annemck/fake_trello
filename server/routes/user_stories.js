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
}
