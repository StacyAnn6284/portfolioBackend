import pool from "../config/db.js";

const createBookTable = async () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(70) NOT NULL,
    status VARCHAR(15) NOT NULL CHECK (status IN ('not started', 'in progress', 'completed')),
    notes VARCHAR(300),
    rating INTEGER NULL CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT NOW()
)`;

    await pool.query(createTableQuery);
    console.log("Book table created");

    const createIndexQuery = `
    CREATE UNIQUE INDEX IF NOT EXISTS unique_book_title_author_idx 
    ON books (LOWER(title), LOWER(author));`;

    await pool.query(createIndexQuery);
    console.log("Unique index fo title and author created succesfully. ");
  } catch (error) {
    console.error("Error setting up books table/index: ", error);
  }
};

export default createBookTable;
