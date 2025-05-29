CREATE TABLE user_profile(
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(50) NOT NULL, 
    user_email VARCHAR(50) NOT NULL, 
    user_password VARCHAR(255) NOT NULL, 
    salt INTEGER
);

CREATE TABLE book(
    book_id SERIAL PRIMARY KEY, 
    title VARCHAR(50) NOT NULL, 
    author VARCHAR(50) NOT NULL, 
    genre varchar(50),
    description VARCHAR(255)
);

CREATE TABLE review(
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user_profile(user_id) ON DELETE CASCADE, 
    book_id INTEGER REFERENCES book(book_id) ON DELETE CASCADE,
    rating FLOAT CHECK(rating<=5 and rating>=0),
    comment VARCHAR(500),
    UNIQUE (user_id,book_id)
);
--Alternate way to add UNIQUE constrainte after table creation
--ALTER TABLE review ADD CONSTRAINT u_constrainte UNIQUE NULLS NOT DISTINCT (user_id, book_id);