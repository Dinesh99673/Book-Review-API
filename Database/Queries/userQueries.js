import pool from '../index.js';

// Fetch a user by their email
export const getUserByEmail = async (email) => {
  const res = await pool.query(
    'SELECT * FROM user_profile WHERE user_email = $1',
    [email]
  );
  return res.rows[0];
};

// Create a new user in the database
export const createUser = async (user_name, email, password, salt) => {
  try {
    await pool.query(
      'INSERT INTO user_profile (username, user_email, user_password, salt) VALUES ($1, $2, $3, $4)',
      [user_name, email, password, salt]
    );
    return { msg: 'User Account created', code: 200 };
  } catch (error) {
    return { msg: 'Something went wrong!! Cannot insert data.', code: 500 };
  }
};
