import pool from "../config/db.js";

export const getAllBooksService = async () => {
  const result = await pool.query("SELECT * FROM books");
  return (await result).rows;
};

export const getBookByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM books where id = $1", [id]);
  return result.rows[0];
};

export const createBookService = async (book, author, status, notes) => {
  const result = await pool.query(
    "INSERT INTO books (book, author, status, notes) VALUES ($1, $2, $3, $4) RETURNING *",
    [book, author, status, notes],
  );
  return result.rows[0];
};

export const updateBookService = async (id, book, author, status, notes) => {
  const result = await pool.query(
    "UPDATE books SET  book=$1, author=$2, status=$3, notes=$4 where id=$5 RETURNING *",
    [book, author, status, notes, id],
  );
  return result.rows[0];
};

export const deleteBookService = async (id) => {
  const result = await pool.query(
    "DELETE FROM books WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};
