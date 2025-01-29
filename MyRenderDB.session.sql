SELECT * FROM game;



-- CREATE TABLE review (
--     review_id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     review_rating DECIMAL(3, 1) NOT NULL,
--     comment TEXT,
--     created_at TIMESTAMP NOT NULL
-- );

-- CREATE TABLE game (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     rating DECIMAL(3, 1) NOT NULL,
--     category VARCHAR(100) NOT NULL,
--     multiplayer BOOLEAN NOT NULL,
--     descript TEXT NOT NULL,
--     release_date DATE NOT NULL,
--     review_id INT,
--     age_rating INT NOT NULL,
--     company VARCHAR(255) NOT NULL,
--     FOREIGN KEY (review_id) REFERENCES review(review_id)
-- );
