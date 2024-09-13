// projectuploadRoute.js
import express from 'express';
import { uploadImageOnCloud } from '../Utils/coludinary.js';
import { upload } from '../Middleware/multer.js';
import { isAuthorized } from '../Middleware/auth.js'; // Authentication middleware
import { getProjectData } from '../controllers/projectUploderController.js'; // Assuming you have this controller

const router = express.Router();

// Controller for uploading project data
const projectDataUploder = async (req, res) => {
    try {
        // Access the uploaded file buffer and original name from multer
        const fileBuffer = req.file.buffer;
        const originalName = req.file.originalname;

        // Upload to Cloudinary
        const result = await uploadImageOnCloud(fileBuffer, 'ProjectsFolder', originalName);

        // Respond with the Cloudinary URL and other details
        res.status(200).json({ success: true, fileUrl: result.secure_url });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Routes
router.post('/project/upload', upload, isAuthorized, projectDataUploder); // Ensure 'upload' handles file uploads
router.get('/project/data/get', getProjectData);

export default router;
