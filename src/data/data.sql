 CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(70) NOT NULL,
    status VARCHAR(15) NOT NULL CHECK (status IN ('not started', 'in progress', 'completed')),
    notes VARCHAR(300),
    rating INTEGER NULL CHECK (rating BETWEEN 1 AND 5)
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
);`