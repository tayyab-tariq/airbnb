import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import placeRoutes from './routes/places.js';
import bookingRoutes from './routes/bookings.js';


import connectDB from './config/db.js';

/* CONFIGURATION */
dotenv.config();
const PORT = process.env.PORT || 5000;

await connectDB();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('dev')); 
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }));

/* ROUTES */
app.use("/auth", authRoutes);userRoutes
app.use("/user", userRoutes);
app.use("/places", placeRoutes);
app.use("/bookings", bookingRoutes);


/* Middleware */
app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})