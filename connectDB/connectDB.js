import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DBNAME = process.env.DBNAME;
const URI = process.env.URI;

const connectToDB = async () => {
    try {
        if (!URI || !DBNAME) {
            throw new Error('Database URI or name is missing in the environment variables');
        }
        await mongoose.connect(URI, { dbName: DBNAME });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection error:', error);
    }
};

export default connectToDB;
