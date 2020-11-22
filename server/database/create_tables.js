const tables = require("./tables.js");

module.exports = {
  extension: `pgcrypto`,
  newTable1: `CREATE TABLE ${tables.table1} (
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(255),
    user_password VARCHAR(255) NOT NULL);`,

  newTable2: `CREATE TABLE ${tables.table2} (
    proj_id SERIAL PRIMARY KEY,
    proj_name VARCHAR(100) NOT NULL,
    proj_desc VARCHAR(500),
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE);`,

  newTable3: `CREATE TABLE ${tables.table3} (
    story_id SERIAL PRIMARY KEY,
    proj_id INTEGER REFERENCES projects(proj_id) ON DELETE CASCADE,
    story_title VARCHAR(100) NOT NULL,
    story_desc VARCHAR(3000) NOT NULL,
    created_date DATE DEFAULT current_date,
    updated_date DATE,
    complete CHAR(1) NOT NULL DEFAULT 'N');`,

  newTable4: `CREATE TABLE ${tables.table4} (task_id SERIAL PRIMARY KEY,
    story_id INTEGER REFERENCES user_stories(story_id) ON DELETE CASCADE,
    proj_id INTEGER REFERENCES projects(proj_id) ON DELETE CASCADE,
    task_title VARCHAR(100) NOT NULL,
    task_desc VARCHAR(1000) NOT NULL,
    task_notes VARCHAR(5000),
    created_date DATE DEFAULT current_date,
    updated_date DATE, task_position VARCHAR(7) NOT NULL DEFAULT 'BACKLOG');`,
};
