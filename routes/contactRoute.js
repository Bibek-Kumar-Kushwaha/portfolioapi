import express from 'express';
import { createContactMessage } from '../controllers/contactController.js';

const router = express.Router();

router.post('/message', createContactMessage);

export default router;
