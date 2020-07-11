CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  Login varchar(255) NOT NULL,
  Password varchar(255) NOT NULL,
  salt varchar(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  title varchar(64) NOT NULL,
  description varchar(255) NOT NULL
);
