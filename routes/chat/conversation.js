import express from 'express';
import { deleteconversation, getConversation, getUserConversation, postConversation } from '../../controller/chat/conversation.js';

// import { getMessage } from '../../controller/chat/message.js';
import auth from '../../middleware/auth.js'

const router = express.Router();


//conversation
// router.route('/conversation').post(auth, postConversation)
// router.route('/conversation/:senderId/:receverId').get(auth, getConversation)
// router.route('/conversation/:senderId').get(auth, getUserConversation)
// router.route('/conversation/:id').delete(auth, deleteconversation)
router.post('/conversation', postConversation);
router.get('/conversation/:senderId/:receverId', getConversation)
router.get('/conversation/:senderId', getUserConversation)
router.delete('/conversation/:id',deleteconversation)



export default router;