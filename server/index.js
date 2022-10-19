// external imports
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// internal imports
import connectionToDb from './config/dbConnection.js';
import paymentRoute from './routeHandler/paymentRoutes.js';

// app object
const app = express();

// environment and database configuration
dotenv.config();
connectionToDb();

// cors policy
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route handler
app.use('/api', paymentRoute);

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next();
  } else {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// listening the server
app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Your server is running successfully at http://${process.env.HOST_NAME}:${process.env.PORT}`
  );
});
