CREATE TABLE user(id SERIAL PRIMARY KEY, user_name VARCHAR(50) NOT NULL, user_email VARCHAR(50) NOT NULL, user_password VARCHAR(255) NOT NULL, salting_value INTEGER);

