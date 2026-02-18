const IdempotencyKey = require('../models/IdempotencyKey');

const idempotencyMiddleware = async (req, res, next) => {
  const key = req.headers['x-idempotency-key'];

  if (!key) {
    return next();
  }

  try {
    const existingKey = await IdempotencyKey.findOne({ key });
    if (existingKey) {
      return res.status(existingKey.responseStatus).json(existingKey.responseBody);
    }

    // Attach a helper to the response to save the result later
    const originalJson = res.json;
    res.json = function (body) {
      const status = res.statusCode;
      // Only cache successful or client error responses, maybe just 2xx and 4xx
      if (status >= 200 && status < 500) {
        IdempotencyKey.create({
          key,
          responseStatus: status,
          responseBody: body,
        }).catch(err => console.error('Idempotency error storage:', err));
      }
      return originalJson.call(this, body);
    };

    next();
  } catch (error) {
    console.error('Idempotency middleware error:', error);
    next();
  }
};

module.exports = idempotencyMiddleware;
