import express from 'express';
import { addmembers, createConversation, deleteuser, getConversation, getConversationDetails } from '../../controller/group/conversation.js';
import { createGroup, deleteGroup, getGroup, putGroup } from '../../controller/group/group.js';
import { imgUpload } from '../../controller/group/group.js';
import { getGroupmsg } from '../../controller/group/message.js';
import { getGroupwallet } from '../../controller/group/wallet.js';
import { uploadImage } from "../../controller/profile/upload.js";
import auth from '../../middleware/auth.js'


const router = express.Router();

// router.route('/').post(auth, createGroup)
// router.route('/:id').get(auth, getGroup)
// router.route('/:id').put(auth, putGroup)
// router.route('/:id').delete(auth, deleteGroup)
// router.route('/:id/photo').put(auth, uploadImage, imgUpload)
router.post('/',createGroup);
router.get('/:id', getGroup);
router.put('/:id', putGroup)
router.delete('/:id', deleteGroup)
router.put('/:id/photo', uploadImage, imgUpload);

//conversation 
// router.route('/conversation').post(auth, createConversation)
// router.route('/conversation/:userId').get(auth, getConversation)
// router.route('/conversation/:groupId/group').get(auth, getConversationDetails)
// router.route('/conversation/deleteuser/:groupId').put(auth, deleteuser)
// router.route('/conversation/addmembers/:groupId').put(auth, addmembers)
router.post('/conversation', createConversation)
router.get('/conversation/:userId', getConversation)
router.get('/conversation/:groupId/group', getConversationDetails)
router.put('/conversation/deleteuser/:groupId',deleteuser)
router.put('/conversation/addmembers/:groupId',addmembers)

//messasges
router.get('/groupmessages/:groupId',getGroupmsg)
// router.route('/groupmessages/:groupId').get(auth, getGroupmsg)
//wallet
// router.route('/wallet/:groupId').get(auth, getGroupwallet)
router.get('/wallet/:groupId',getGroupwallet)

export default router;