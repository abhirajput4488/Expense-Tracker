const Expense = require('../models/Expense');
const { validationResult } = require('express-validator');

// @desc    Create a new expense
// @route   POST /expenses
// @access  Public
const createExpense = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { amount, category, description, date } = req.body;
  console.log('Attempting to create expense for user:', req.user?.id);
  console.log('Request body:', req.body);

  try {
    const expense = await Expense.create({
      amount,
      category,
      description,
      date,
      user: req.user.id,
    });

    console.log('Expense saved successfully:', expense._id);
    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    console.error('Error creating expense:', error);
    next(error);
  }
};

// @desc    Get all expenses with filtering and sorting
// @route   GET /expenses
// @access  Private
const getExpenses = async (req, res, next) => {
  try {
    const { category, sort } = req.query;
    let query = { user: req.user.id };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Build the query
    let result = Expense.find(query);

    // Sort by date (default newest first)
    if (sort === 'oldest') {
      result = result.sort('date');
    } else {
      result = result.sort('-date');
    }

    const expenses = await result;

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpense,
  getExpenses,
};
