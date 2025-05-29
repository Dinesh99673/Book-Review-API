import pool from '../index.js';

// Add a new book to the database
export const addBook = async ({ title, author, genre, description }) => {
  try {
    await pool.query(
      'INSERT INTO book (title, author, genre, description) VALUES ($1, $2, $3, $4)',
      [title, author, genre, description]
    );
    return { msg: 'Book added', code: 201 };
  } catch (error) {
    return { msg: 'Something went wrong!! cannot insert book data.', code: 500 };
  }
};

// Retrieve books with optional filters and pagination
export const getAllBooks = async (title, author, genre, page) => {
  let baseQuery = 'SELECT * FROM book WHERE 1=1'; // base query to allow dynamic filters
  const params = [];
  let i = 1;

  // Add optional filters using ILIKE for case-insensitive partial match
  if (author) {
    baseQuery += ` AND author ILIKE $${i++}`;
    params.push(`%${author}%`);
  }
  if (genre) {
    baseQuery += ` AND genre ILIKE $${i++}`;
    params.push(`%${genre}%`);
  }
  if (title) {
    baseQuery += ` AND title ILIKE $${i++}`;
    params.push(`%${title}%`);
  }

  // Add pagination: limit 10 results per page
  baseQuery += ` LIMIT 10 OFFSET $${i}`;
  params.push((page - 1) * 10);

  const res = await pool.query(baseQuery, params);
  return res.rows;
};

// Get detailed book info by ID, including average rating and reviews
export const getBookDetails = async (id) => {
  const book = await pool.query('SELECT * FROM book WHERE book_id = $1', [id]);
  const reviews = await pool.query('SELECT * FROM review WHERE book_id = $1', [id]);
  const avg = await pool.query('SELECT AVG(rating) FROM review WHERE book_id = $1', [id]);

  return {
    book: book.rows[0],
    averageRating: parseFloat(avg.rows[0].avg).toFixed(2),
    reviews: reviews.rows,
  };
};
