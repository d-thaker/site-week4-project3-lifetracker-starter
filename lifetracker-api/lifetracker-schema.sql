CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  username   TEXT NOT NULL UNIQUE,
  password   TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
  is_admin   BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE nutrition (
  id        SERIAL PRIMARY KEY,
  name      TEXT NOT NULL,
  category  TEXT,
  quantity  INTEGER DEFAULT 1,
  calories  INTEGER,
  image_url TEXT,
  user_id   INTEGER REFERENCES users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT NOW()  
);

CREATE TABLE exercises (
  id        SERIAL PRIMARY KEY,
  name      TEXT NOT NULL,
  category  TEXT,  
  duration  INTEGER,
  intensity INTEGER,  
  user_id   INTEGER REFERENCES users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sleep (
  id         SERIAL PRIMARY KEY,
  start_time TIMESTAMP NOT NULL,
  end_time   TIMESTAMP NOT NULL,
  user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
  timestamp  TIMESTAMP DEFAULT NOW() 
);
