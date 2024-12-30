const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

// MongoDB connection string
const uri = 'mongodb+srv://rishabh22356:asdfghjkl@cluster0.ymgsy.mongodb.net/'; // Your MongoDB connection string
const client = new MongoClient(uri);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow only this origin
  credentials: true, // Allow credentials (like cookies) to be sent
}));

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Set up session
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    clientPromise: client.connect(), // Use the MongoDB client
    dbName: 'kpack', // Specify your database name
  }),
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 15, // 1 hour
  },
}));

// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
// Register a new user
app.post('/register', async (req, res) => {
  const { id, password } = req.body;
  console.log(id+" "+password);

  const database = client.db('kpack');
  const users = database.collection('kisan');

  // Check if user already exists
  const existingUser = await users.findOne({ id });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user
  await users.insertOne({ id, password: hashedPassword });
  res.json({ message: 'Registration successful' });
});

// Login user and create a session
app.post('/login', async (req, res) => {
  const { id, password } = req.body;

  const database = client.db('kpack');
  const users = database.collection('kisan');

  // Find user by ID
  const user = await users.findOne({ id });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Check password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Store user ID in session
  req.session.userId = user._id;
  res.json({ message: 'Login successful' });
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

// Protected route example
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.json({ message: `Welcome to your dashboard, user ${req.session.userId}` });
});

// Logout user and destroy the session
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout error' });
    }
    res.clearCookie('connect.sid');  // Clear session cookie
    res.json({ message: 'Logout successful' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
