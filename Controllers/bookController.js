import { addBook, getAllBooks, getBookDetails } from '../Database/Queries/bookQueries.js';

// Controller to handle adding a new book (requires authenticated user)
export const createBook = async (req, res) => {
  const { title, author, genre, description } = req.body;
  const { msg, code } = await addBook({ title, author, genre, description });
  res.status(code).json({ msg });
};

// Controller to fetch list of books with optional filters and pagination
export const listBooks = async (req, res) => {
  const { title, author, genre, page = 1 } = req.body;
  const books = await getAllBooks(title, author, genre, page);
  res.json(books);
};

// Controller to get detailed info about a specific book by ID
export const bookDetails = async (req, res) => {
  const { id } = req.params;
  const details = await getBookDetails(id);
  res.json(details);
};
