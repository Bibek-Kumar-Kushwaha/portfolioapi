import express from 'express';
import { projectDataUploder,getProjectData } from '../controllers/projectUploderController.js';
import { upload } from '../Middleware/multer.js';
import { isAuthorized } from '../Middleware/auth.js';

const router = express.Router();

router.post('/project/upload',upload,isAuthorized,projectDataUploder);
router.get('/project/data/get',getProjectData)

export default router;