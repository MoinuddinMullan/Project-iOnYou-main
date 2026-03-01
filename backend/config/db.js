const mongoose = require('mongoose');
const debug = require('debug')('backend:db');
const connectDB = async (uri) => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    debug('MongoDB connected');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
