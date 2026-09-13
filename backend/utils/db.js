const mongoose = require('mongoose');

// Reuse one connection across warm serverless invocations (and hot reloads locally).
// Without this every cold start opens a fresh Atlas connection (~1s TLS + auth).
const cached = global.__mongooseConn || (global.__mongooseConn = { promise: null });

function connectDB() {
  if (mongoose.connection.readyState === 1) return Promise.resolve(mongoose.connection);
  if (!process.env.MONGODB_URI) return Promise.reject(new Error('MONGODB_URI is not defined'));

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        maxPoolSize: 10,
        minPoolSize: 1,
        serverSelectionTimeoutMS: 8000,
        socketTimeoutMS: 30000,
      })
      .then((m) => m.connection)
      .catch((err) => {
        cached.promise = null; // allow a retry on the next request
        throw err;
      });
  }
  return cached.promise;
}

module.exports = { connectDB };
