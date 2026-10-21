import { body, param, validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Validation rules for creating or updating a book
export const validateBook = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 50 })
    .withMessage("Title cannot exceed 50 characters."),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required.")
    .isLength({ max: 70 })
    .withMessage("Author cannot exceed 70 characters."),

  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["not started", "in progress", "completed"])
    .withMessage(
      "Status must be: 'not started', 'in progress', or 'completed'.",
    ),

  body("notes")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 300 })
    .withMessage("Notes cannot exceed 300 characters."),

  body("rating")
    .optional({ nullable: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be a number between 1 and 5."),

  handleValidationErrors,
];

// Validation rules for routes that take an ID (e.g., Get by ID, Update, Delete)
export const validateBookId = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Book ID must be a valid positive integer."),

  handleValidationErrors,
];
