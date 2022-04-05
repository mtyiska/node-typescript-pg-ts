DROP TABLE IF EXISTS jokes;
CREATE TABLE jokes (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    joke_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    joke VARCHAR(255),
    setup VARCHAR(255),
    delivery VARCHAR(255),
    rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
    ),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE users (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
