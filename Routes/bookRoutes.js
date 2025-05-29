import express from 'express';
import { createBook, listBooks, bookDetails } from '../Controllers/bookController.js';
import { postReview } from '../Controllers/reviewController.js';
import authenticate from '../Middlewares/authMiddleware.js';

const router = express.Router();

// Add a new book (auth required)
router.post('/', authenticate, createBook);

// Submit a review for a specific book (auth required)
router.post('/:id/review', authenticate, postReview);

// Get a list of all books (with pagination & filters)
router.get('/', listBooks);

// Get details of a specific book by ID
router.get('/:id', bookDetails);

export default router;
