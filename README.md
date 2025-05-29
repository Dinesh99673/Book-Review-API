
# Book Review API

A RESTful API built with Node.js and PostgreSQL for managing books, user accounts, and reviews.

---

## Project Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dinesh99673/Book-Review-API.git
   cd Book-Review-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the project root and add the following environment variables:
   ```
   PORT=5000
   JWT_SECRET_KEY=<your_jwt_secret_key>
   TOKEN_HEADER_KEY=<your_token_header_key>
   DATABASE_URL=postgresql://postgres:"Password"@localhost:5432/"DBname"
   ```

4. **Setup the database**
   - Ensure PostgreSQL is installed and running.
   - Create the database and specify it in `DATABASE_URL`.
   - Run the SQL commands from `database.sql` file to create necessary tables:

---

## How to Run Locally

Start the server using nodemon (recommended for development):

```bash
nodemon server.js
```

The API server will run on the port specified in `.env` (default 5000).

---

## Example API Requests

You can use **Postman** to test the API. Below are example requests.

### 1. Signup
- **Endpoint:** `POST /auth/signup`
- **Body (JSON):**
```json
{
  "username": "Dinesh",
  "email": "dinesh@example.com",
  "password": "securePassword123"
}
```

### 2. Login
- **Endpoint:** `POST /auth/login`
- **Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
- **Response:**
```json
{
  "token": "<JWT_TOKEN>"
}
```

### 3. Add a Book
- **Endpoint:** `POST /books`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Body (JSON):**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic",
  "description": "A novel set in the Jazz Age."
}
```

### 4. Search Books
- **Endpoint:** `GET /books`
- **Body (JSON):** *(All the parameters are optional.)* 
```json
{
  "title": "It Ends With Us",
  "author": "Collen Hover",
  "genre": "Romantic",
  "page": 1
}
```
### 5. Search Books
- **Endpoint:** `GET /books`
- **Body (JSON):**
```json
{
    "genre": "mystery"
}
```
- **Response:**
```json
[
    {
        "book_id": 2,
        "title": "The Silent Forest",
        "author": "Emma Gray",
        "genre": "Mystery",
        "description": "A detective must uncover the truth behind a series of strange disappearances in a remote woodland town."
    },
    {
        "book_id": 14,
        "title": "Echoes in the Fog",
        "author": "Camille Rhodes",
        "genre": "Mystery",
        "description": "A true-crime podcaster is drawn into a real investigation when a local girl vanishes."
    }
]
```
### 6. Add a Review
- **Endpoint:** `POST /books/:id/review` 
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Body (JSON):**
```json
{
  "rating": 4.9,
  "comment": "Good story line"
}
```

### 7. Update a Review
- **Endpoint:** `PUT /reviews/:id` 
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Body (JSON):**
```json
{
  "rating": 3.6,
  "comment": "Good story"
}
```
---

## Design Decisions and Assumptions

- **Raw SQL Queries:**  
  To keep the project lightweight and demonstrate SQL proficiency, raw queries with parameterized inputs are used instead of an ORM.

- **Password Security:**  
  Passwords are salted with a random 4-digit number before hashing with bcrypt for added security.

- **Authentication:**  
  JWT tokens are used for authenticating requests. Tokens must be passed in the request header under the key defined by `TOKEN_HEADER_KEY` in `.env`.

- **Error Handling:**  
  API consistently returns JSON responses with `msg` and appropriate HTTP status codes on success or failure.

- **Pagination:**  
  Book listing supports pagination with a default page size of 10 items.

---

