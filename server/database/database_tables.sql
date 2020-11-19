DROP DATABASE project_management;

CREATE DATABASE project_management;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(255),
  user_password VARCHAR(255) NOT NULL CHECK (length(user_password) >= 8)
);

CREATE TABLE projects (
  proj_id SERIAL PRIMARY KEY,
  proj_name VARCHAR(100) NOT NULL,
  proj_desc VARCHAR(500),
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE user_stories (
  story_id SERIAL PRIMARY KEY,
  proj_id INTEGER REFERENCES projects(proj_id) ON DELETE CASCADE,
  story_title VARCHAR(100) NOT NULL,
  story_desc VARCHAR(3000) NOT NULL,
  created_date DATE NOT NULL,
  updated_date DATE,
  complete CHAR(1) NOT NULL DEFAULT 'N'
);

CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  story_id INTEGER REFERENCES user_stories(story_id) ON DELETE CASCADE,
  task_title VARCHAR(100) NOT NULL,
  task_description VARCHAR(1000) NOT NULL,
  task_notes VARCHAR(5000),
  created_date DATE,
  updated_date DATE,
  task_position VARCHAR(7) NOT NULL DEFAULT 'BACKLOG'
);
