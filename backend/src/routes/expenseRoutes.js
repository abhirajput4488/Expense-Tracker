const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { createExpense, getExpenses } = require('../controllers/expenseController');
const idempotencyMiddleware = require('../middleware/idempotency');
const { protect } = require('../middleware/authMiddleware');


// Validation rules
const expenseValidation = [
  body('amount')
    .isInt({ min: 0 })
    .withMessage('Amount must be a non-negative integer (cents)'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .trim(),
  body('date')
    .isISO8601()
    .withMessage('Valid date is required'),
];

router.route('/')
  .post(protect, idempotencyMiddleware, expenseValidation, createExpense)
  .get(protect, getExpenses);

module.exports = router;
