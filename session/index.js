require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

// MongoDB connection string from environment variable
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Allowed origins for CORS
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

// CORS Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB before initializing session
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);  // Exit process if connection fails
  }
}
connectToDatabase(); // Call function to connect to DB

// Session setup and return sessionId
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    clientPromise: client.connect(),  // Avoid reconnecting if client is already connected
    dbName: 'KPAC',
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 15,  // 15 minutes
  },
}));

// Register a new user
app.post('/register', async (req, res) => {
  const { phone, formData } = req.body;

  if (!formData || typeof formData !== 'object') {
    return res.status(400).json({ message: 'formData is not in the correct format' });
  }

  const { firstName, middleName, lastName, emailid, age, state, city, address, pincode } = formData;

  const database = client.db('KPAC');
  const users = database.collection('Details');

  try {
    const existingUser = await users.findOne({ phone_no: phone});
    if (existingUser) {
      console.log(`user ${phone} already exist`)
      return res.status(409).json({ message: 'User already exists' });
    }

    const userData = {
      phone_no: phone,
      Name: `${firstName} ${middleName} ${lastName}`.trim(),
      Age: parseInt(age, 10),
      Email: emailid,
      Address: `${address}, ${city}, ${state}`,
      Pincode: pincode,
    };

    const result = await users.insertOne(userData);
    const responseData = {
      _id: result.insertedId,
      ...userData,
    };

    return res.json({ message: 'Registration successful', data: responseData });
  } catch (error) {
    console.error('Insert error:', error);
    return res.status(500).json({ message: 'Registration failed due to a server error' });
  }
});

// Login user and create a sessionID and return sessionId and data
app.post('/login', async (req, res) => {
  const { phone, password } = req.body;

  const database = client.db('KPAC');
  const users = database.collection('Details');
  const temp={ phone_no: phone }
  console.log(temp)
  try {
    const user = await users.findOne({ phone_no: phone });
    if (!user) {
      console.log('Invalid Phone NO')
      return res.status(401).json({ message: 'Invalid Phone No' });
    }else{
      console.log("user found : "+user.Name)
    }


    // Uncomment if password validation is needed
    // const match = await bcrypt.compare(password, user.password);
    // if (!match) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }

    req.session.userId = user.phone_no;
    console.log(`Session set - userId: ${req.session.userId}, Full session data:`, req.session);
    

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Authentication Middleware
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
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
