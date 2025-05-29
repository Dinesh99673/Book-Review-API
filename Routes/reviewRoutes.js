import express from 'express';
import { postReview, editReview, removeReview } from '../Controllers/reviewController.js';
import authenticate from '../Middlewares/authMiddleware.js';

const router = express.Router();

// Edit/Update a review by review ID (auth required)
router.put('/:id', authenticate, editReview);

// Delete a review by review ID (auth required)
router.delete('/:id', authenticate, removeReview);

export default router;
