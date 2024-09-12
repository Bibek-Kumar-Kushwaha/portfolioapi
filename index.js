import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connectToDB from './connectDB/connectDB.js';
import contactRoute from './routes/contactRoute.js';
import visitRoute from './routes/visitRoute.js';
import registerRoute from './routes/userRegisterRoute.js';
import projectUploderRouter from './routes/projectUploadRoute.js';

// Load environment variables
dotenv.config();

const app = express();

// Set up CORS with specific origin for your domain
app.use(cors({
    origin: "https://www.bibekkumarkushwaha.com.np",
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true, 
}));

// Set security headers
app.use(helmet());

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use('/api', contactRoute);
app.use('/api', visitRoute);
app.use('/api', registerRoute);
app.use('/api', projectUploderRouter);

// Default route to check server status
app.get('/', (req, res) => {
    res.send('Server is ready to serve...');
});

// Database connection
connectToDB();

// Export the app for Vercel's serverless function compatibility
export default app;
