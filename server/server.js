const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const app = express();
const PORT = parseInt(process.env.PORT) || 5000;

if (!process.env.MONGO_URI) {
    console.log("Missing environment variable: MONGO_URI");
    process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(helmet({contentSecurityPolicy: false,}));
app.use(xss());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to NeighbourNet");
    })
    .catch((err) => {
        console.error("MongoDB connection error: " + err);
        process.exit(1); 
    });

app.use('/api/users', require('./routes/users'));
app.use('/api/actions', require('./routes/actions'))
app.use('/api/actionresponse', require('./routes/actionresponse'))
app.use('/api/todos', require('./routes/todos'))
app.use('/api/overview', require('./routes/overview'))

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: 'Something went wrong!!' });
    next(err);
});

const shutdown = () => {
    console.log("Shutting down gracefully...");
    mongoose.connection.close(() => {
        console.log("MongoDB connection closed.");
        process.exit(0);
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Promise Rejection:', reason);
});
mongoose.connection.on('disconnected', () => {
    console.error('MongoDB disconnected! Trying to reconnect...');
    mongoose.connect(process.env.MONGO_URI).catch(err => console.error('Reconnection failed:', err));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
