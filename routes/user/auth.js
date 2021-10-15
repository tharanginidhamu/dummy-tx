import express from 'express';
import { register, login, resetPassword, refreshToken, otpverification, forgetPasswordemail, forgetPasswordmobile } from '../../controller/user/auth.js';
// import auth from '../middleware/auth'
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgetpassword/email', forgetPasswordemail);
router.post('/forgetpassword/mobile', forgetPasswordmobile);
router.put('/resetpassword/:resettoken', resetPassword);
router.post('/renewtoken', refreshToken)
router.post('/otpverify',otpverification)

// function auth(req, res, next){

//     let token = req.headers["authorization"];
//     token = token.split(" ")[1];
   
//     jwt.verify(token, process.env.JWT_SECRET_REFRESH, (err, user)=>{
//         if(!err){
//             req.user = user;
//             next();
//         }else {
//             return res.status(403).json({msg:"User not authenticated"})
//         }
//     })
//    }
 
// router.post('/dummy', auth, (req, res)=>{
//     res.json({
//         name:'name',
//         location:'location'
//     })
// })


export default router;
