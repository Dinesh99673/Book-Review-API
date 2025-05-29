import express from 'express';
import { signup, login } from '../Controllers/authController.js';

const router = express.Router();

// User signup route
router.post('/signup', signup);

// User login route
router.post('/login', login);

export default router;
