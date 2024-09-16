const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const app = express();
const PORT = parseInt(process.env.PORT) || 8000;

if (!process.env.MONGO_URI) {
    console.log("Missing environment variable: MONGO_URI");
    process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(xss());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
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

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: 'Something went wrong!!' });
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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
