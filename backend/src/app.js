const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorMiddleware');



const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());

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
