// multer.js
import multer from 'multer';

// Multer storage setup - store files in memory
const storage = multer.memoryStorage();

// Single file upload configuration
export const upload = multer({ storage: storage }).single('projectImage');
