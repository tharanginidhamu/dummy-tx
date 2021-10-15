// import auth from '../../middleware/auth.js'
// import send from '../../middleware/pushnotification.js';
import express from 'express'
import { deleteaccount, fetchaccont, fetchaccountbyid, fetchall, postaccont, ptaccont } from '../controller/plaidaccont.js';

// import send from '../middleware/pushnotification.js';

const router = express.Router();
router.post('/plaidaccount',postaccont)
router.get('/plaidaccount/getbyid/:id', fetchaccountbyid);
router.get('/plaidaccount/getall',fetchall)
router.get('/plaidaccount/get',fetchaccont)
router.put('/plaidaccount/:id',ptaccont)
router.delete('/plaidaccount/:id',deleteaccount)
export default router