import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/bookController.js";
import {
  validateBook,
  validateBookId,
} from "../middlewares/validators/bookValidator.js";

const router = express.Router();

router.post("/", validateBook, createBook);
router.get("/", getAllBooks);
router.get("/:id", validateBookId, getBookById);
router.put("/:id", validateBook, updateBook);
router.delete("/:id", validateBookId, deleteBook);

export default router;
