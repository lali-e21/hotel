import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import roomRoutes from './routes/room.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import adminRoutes from './routes/admin.routes.js';
import promoRoutes from './routes/promo.routes.js';
import serviceRoutes from './routes/service.routes.js';
import galleryRoutes from './routes/gallery.routes.js';

dotenv.config();

const app = express();

// 1. Connect to Database
connectDB();

// 2. Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use('/api', limiter);

// 3. Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/promos', promoRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/gallery', galleryRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Sunrise Grand Hotel API' });
});

// 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({ status: 'fail', message: `Cannot ${req.method} ${req.originalUrl}` });
});

// Global error handler (Express 5 compatible - must have exactly 4 params)
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const statusCode = err.status || err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Something went wrong',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
