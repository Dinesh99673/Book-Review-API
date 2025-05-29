import pool from '../index.js';

//add a new review for a specific book by a specific user
export const addReview = async (userId, bookId, rating, comment) => {
  try{
    await pool.query(
      'INSERT INTO review (user_id, book_id, rating, comment) VALUES ($1, $2, $3, $4)',
      [userId, bookId, rating, comment]
    );
    return {msg:'Review added',code:200}
  }
  catch(error){
    return {msg:"cannot review Twice !!",code:500}
  }
};

//Update a review by review ID
export const updateReview = async (id, rating, comment) => {
  try{
    await pool.query(
      'UPDATE review SET rating = $1, comment = $2 WHERE review_id = $3',
      [rating, comment, id]    
    );
    return {msg:'Review Updated',code:200}
  }
  catch(error){
    return {msg:'Something went wrong !! cannot update review.',code:500};    
  }
};

//Delete a review by review ID
export const deleteReview = async (id) => {
  try{
    await pool.query('DELETE FROM review WHERE review_id = $1', [id]);
    return {msg:'Review deleted.',code:200};
  }
  catch(error){
    return {msg:'Something went wrong !! cannot delete review.',code:500}
  }
  };
