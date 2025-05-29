import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './Routes/authRoutes.js';
import bookRoutes from './Routes/bookRoutes.js';
import reviewRoutes from './Routes/reviewRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Route handling
app.use('/auth', authRoutes);      // Signup & login
app.use('/books', bookRoutes);     // Book-related endpoints
app.use('/reviews', reviewRoutes); // Review-related endpoints
app.use('/search', bookRoutes);    // Book search handled in bookRoutes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
