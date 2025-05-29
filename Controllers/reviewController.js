import { addReview, updateReview, deleteReview } from '../Database/Queries/reviewQueries.js';

// Handle adding a new review for a book by authenticated user
export const postReview = async (req, res) => { 
  const { rating, comment } = req.body;
  const userId = req.user.userId; // get userId from authenticated user info
  const { id } = req.params; // book id from URL parameter
  const { msg, code } = await addReview(userId, id, rating, comment);
  res.status(code).json({ msg });
};

// Handle updating an existing review by review ID
export const editReview = async (req, res) => {
  const { id } = req.params; // review id
  const { rating, comment } = req.body;
  const { msg, code } = await updateReview(id, rating, comment);
  res.status(code).json({ msg });
};

// Handle deleting a review by review ID
export const removeReview = async (req, res) => {
  const { id } = req.params; // review id
  const { msg, code } = await deleteReview(id);
  res.status(code).json({ msg });
};
