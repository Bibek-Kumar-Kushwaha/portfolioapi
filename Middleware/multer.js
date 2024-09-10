// Multer Configuration
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'Public/Project');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const newFileName = 'Project_' + uuidv4() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

// Single file upload configuration
export const upload = multer({ storage: storage }).single('projectImage');
