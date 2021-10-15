import express from 'express';
import auth from '../../middleware/auth.js'
import { 
     deleteProfile, 
     getAllProfile, 
     getProfile, 
     postProfile, 
     putProfile

} from '../../controller/profile/profile.js';
import { imgUpload, uploadImage } from '../../controller/profile/upload.js';
import { deletewallet, getwallet, postwallet, updatewallet } from '../../controller/profile/individualwallet.js';
import { createaccount, deleteaccount, getaccount, putaccount } from '../../controller/profile/account.js';
import { send } from '../../middleware/pushnotification.js';






const router = express.Router();

router.route('/')
     .get(auth, getProfile)
     .post(auth, postProfile)
router
     .route('/:id')
     .put(auth, putProfile);
router
     .route('/:id')
     .delete(auth, deleteProfile);

  router.put('/:id/photo',auth, uploadImage, imgUpload);
  router.get('/all',getAllProfile )
  
  //individual wallet
//   router.route('/individualwallet').post(auth, postwallet)
//   router.route('/individualwallet/:profileId').get(auth, getwallet)
//   router.route('/individualwallet/:id').put(auth, updatewallet)
//   router.route('/individualwallet/:id').delete(auth, deletewallet)

router.post('/individualwallet',postwallet)
router.get('/individualwallet/:profileId',getwallet)
router.put('/individualwallet/:id',updatewallet)
router.delete('/individualwallet/:id',deletewallet)

//account
router.post('/account',createaccount)
router.get('/account/:profileId',getaccount)
router.put('/account/:id',putaccount)
router.delete('/account/:id',deleteaccount)
// router.route('/account').post(auth, createaccount)
// router.route('/account/:profileId').get(auth, getaccount)
// router.route('/account/:id').put(auth, putaccount)
// router.route('/account/:id').delete(auth, deleteaccount)

//notifications
 router.post('/sendnotification',send)
export default router;
