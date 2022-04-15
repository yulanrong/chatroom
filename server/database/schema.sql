-- in terminal, run psql postgres
-- \i schema.sql

CREATE DATABASE chatroomdb;
\connect chatroomdb;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS messages;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE messages (
  message_id BIGSERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  created_at TIMESTAMP,
  user_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

