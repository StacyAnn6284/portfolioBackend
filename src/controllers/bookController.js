//Standarized response function

import {
  createBookService,
  deleteBookService,
  getAllBooksService,
  getBookByIdService,
  searchBookService,
  updateBookService,
} from "../models/bookModel.js";

const handleRespose = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createBook = async (req, res, next) => {
  const { book, author, status, notes } = req.body;
  try {
    const newBook = await createBookService(book, author, status, notes);
    handleRespose(res, 201, "Book created successfully", newBook);
  } catch (err) {
    next(err);
  }
};

export const getAllBooks = async (req, res, next) => {
  try {
    const search = req.query.search;

    if (search) {
      const books = await searchBookService(search);
      return handleRespose(res, 200, "Search results", books);
    }
    const books = await getAllBooksService();
    handleRespose(res, 200, "Books fetched successfully", books);
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await getBookByIdService(req.params.id);
    if (!book) return handleRespose(res, 404, "Book not found");
    handleRespose(res, 201, "Book fetched successfully", book);
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req, res, next) => {
  const { book, author, status, notes } = req.body;
  try {
    const updatedBook = await updateBookService(
      req.params.id,
      book,
      author,
      status,
      notes,
    );
    if (!updatedBook) return handleRespose(res, 404, "Book not found");
    handleRespose(res, 201, "Book updated successfully", updatedBook);
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const deletedBook = await deleteBookService(req.params.id);
    if (!deletedBook) return handleRespose(res, 404, "Book not found");
    handleRespose(res, 201, "Book deleted successfully", deletedBook);
  } catch (err) {
    next(err);
  }
};

// export const searchBooks = async (req, res, next) => {
//   try {
//     const books = await bookSearchService();
//     handleRespose(res, 200, "Books fetched successfully", books);
//   } catch (err) {
//     next(err);
//   }
// };
