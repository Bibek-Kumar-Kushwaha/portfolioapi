// projectuploadRoute.js
import express from 'express';

import { upload } from '../Middleware/multer.js';
import { isAuthorized } from '../Middleware/auth.js'; 
import { getProjectData, projectDataUploder } from '../controllers/projectUploderController.js'; 

const router = express.Router();

// Routes
router.post('/project/upload', upload, isAuthorized, projectDataUploder); 
router.get('/project/data/get', getProjectData);

export default router;
