const mongoose = require('mongoose');
require('dotenv').config();

const testURI = "mongodb+srv://abhirao274408:omkKpJj9JbqhJun5@cluster0.xlm9vzp.mongodb.net/ExpenseTracker?retryWrites=true&w=majority";

console.log('Testing connection to:', testURI.replace(/:([^@]+)@/, ':****@'));

mongoose.connect(testURI)
  .then(() => {
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ FAILED:');
    console.error(err.message);
    process.exit(1);
  });
