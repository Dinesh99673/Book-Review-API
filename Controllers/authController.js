import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail } from '../Database/Queries/userQueries.js';

// Handle user signup - create new user account
export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user with given email already exists
    const existing = await getUserByEmail(email);

    // Generate a simple 4-digit salt for hashing password
    var salt = Math.floor(1000 + Math.random() * 9000);
    console.log(salt);

    if (existing) 
        return res.status(409).json({ msg: 'User exists' });

    // Hash password combined with salt
    const hashed = await bcrypt.hash(password + salt, 10);

    // Insert new user into database
    const { msg, code } = await createUser(username, email, hashed, salt);

    // Send response with success or failure message
    res.status(code).json({ msg });
};

// Handle user login - authenticate and return JWT token
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Get user details by email
    const user = await getUserByEmail(email);

    // If user not found, send error
    if (!user) return res.status(401).json({ msg: 'Invalid email' });

    // Compare hashed password in DB with hash of entered password + salt
    const match = await bcrypt.compare(password + user.salt, user.user_password);

    // If password mismatch, send error
    if (!match) return res.status(401).json({ msg: 'Invalid password' });

    // Generate JWT token with user id payload
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET_KEY);

    // Send token in response
    res.json({ token });
};
