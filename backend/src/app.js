const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorMiddleware');



const app = express();

// Trust proxy for secure cookies/headers behind a load balancer (Render/Vercel)
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet());

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Body Parser Middleware
app.use(express.json());

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);


// Root Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Expense Tracker API' });
});

app.use(errorHandler);

module.exports = app;
