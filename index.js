import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import connectToDB from './connectDB/connectDB.js';
import contactRoute from './routes/contactRoute.js';
import visitRoute from './routes/visitRoute.js';
import registerRoute from './routes/userRegisterRoute.js'
import projectUploderRouter from './routes/projectUploadRoute.js';

dotenv.config();
const app = express();

// app.use(cors());
app.use(cors({
    origin: "https://www.bibekkumarkushwaha.com.np",
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true, 
}));
app.use(helmet());
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', contactRoute);
app.use('/api', visitRoute);
app.use('/api', registerRoute);
app.use('/api', projectUploderRouter);

app.get('/', (req, res) => {
    res.send('Server is ready to serve...');
});

connectToDB();

export default app;

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
