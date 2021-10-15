// import auth from '../../middleware/auth.js'
// import send from '../../middleware/pushnotification.js';
import express from 'express'
import { getmessages } from '../controller/chat/message.js';
// import send from '../middleware/pushnotification.js';

const router = express.Router();
router.get('/messages', getmessages);
export default router