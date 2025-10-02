# Auth System Backend

A Node.js authentication system with JWT tokens, Passport.js, and MongoDB.

## Features

- User registration and login
- JWT token authentication
- Password hashing with bcrypt
- Protected routes (custom middleware and Passport.js)
- MongoDB database integration
- CORS enabled

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create a `.env` file in the root directory:**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/auth-system
   JWT_SECRET=yourSecretKey
   ```

3. **Make sure MongoDB is running on your system**

4. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Public Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Protected Routes
- `GET /api/auth/protected` - Protected route (custom JWT middleware)
- `GET /api/auth/passport-protected` - Protected route (Passport.js)

## Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

### Access protected route
```bash
curl -X GET http://localhost:5000/api/auth/protected \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Project Structure

```
backend/
├── config/
│   ├── db.js          # Database connection
│   ├── keys.js        # Secret keys
│   └── passport.js    # Passport configuration
├── controllers/
│   └── authController.js  # Authentication logic
├── middleware/
│   └── authMiddleware.js  # Custom JWT middleware
├── models/
│   └── User.js        # User model
├── routes/
│   ├── auth.js        # Authentication routes
│   └── index.js       # Main router
├── utils/
│   └── generateToken.js  # JWT token generator
└── server.js          # Main server file
```

