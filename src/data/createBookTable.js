import pool from "../config/db.js";

const createBookTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(70) NOT NULL,
    status VARCHAR(15) NOT NULL CHECK (status IN ('not started', 'in progress', 'completed')),
    notes VARCHAR(300),
    rating INTEGER NULL CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT NOW()
);`;
  try {
    await pool.query(queryText);
    console.log("Book table created if not exists");
  } catch (error) {
    console.log("Error creating books table: ", error);
  }
};

export default createBookTable;
