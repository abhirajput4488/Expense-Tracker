const mongoose = require('mongoose');

const idempotencyKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  responseStatus: {
    type: Number,
    required: true,
  },
  responseBody: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // 24 hours
  },
});

module.exports = mongoose.model('IdempotencyKey', idempotencyKeySchema);
