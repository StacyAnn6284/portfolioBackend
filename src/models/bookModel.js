import pool from "../config/db.js";

export const getAllBooksService = async () => {
  const result = await pool.query("SELECT * FROM books");
  return (await result).rows;
};

export const getBookByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM books where id = $1", [id]);
  return result.rows[0];
};

export const createBookService = async (title, author, status, notes, rating) => {
  const result = await pool.query(
    "INSERT INTO books (title, author, status, notes, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [title, author, status, notes, rating],
  );
  return result.rows[0];
};

export const updateBookService = async (id, title, author, status, notes, rating) => {
  const result = await pool.query(
    "UPDATE books SET  title=$1, author=$2, status=$3, notes=$4, rating=$5 where id=$6 RETURNING *",
    [title, author, status, notes, rating, id],
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

export const searchBookService = async (query) => {
  const search = `%${query}%`;
  const result = await pool.query(
    "SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1",
    [search],
  );
  return result.rows;
};

export const filterBooksByStatus = async (query) => {
  const result = await pool.query(
    "SELECT * FROM books WHERE LOWER(status) = LOWER($1)",
    [query],
  );
  return result.rows;
};
