import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  searchBooks,
  updateBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/book", createBook);
router.get("/book", getAllBooks);
router.get("/book/:id", getBookById);
router.put("/book/:id", updateBook);
router.delete("/book/:id", deleteBook);
router.search("/book/:param", searchBooks);

export default router;
