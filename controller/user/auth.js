import crypto from 'crypto'
import User from '../../models/user/User.js';
import asyncHandler from '../../middleware/async.js';
import sendEmail from '../../utils/sendEmail.js'
import jwt from 'jsonwebtoken';
import vonage from '../../middleware/vonage.js';
// import ErrorResponse from '../utils/errorResponse.js';


//@Desc     Register User
//@Route    POST/api/v1/auth/register
//@access   Public

export const register = asyncHandler(async (req, res, next,err) => {
  const { firstname, lastname, email,username, role, phone, code,password, policies } = req.body;

  //create user
  const user = await User.create({
    firstname,
    lastname,
    email,
    username,
    role,
    phone,
    code,
    password,
    policies
  });
  // if(res.status==400){
    
  //   res.send('Username already exists')
  // };
  // sendTokenResponse(user, 200, res)
  //Create Token
  const token = user.getSignedJwtToken();

  res.status(200).json({ sucess: true, token })

});

//@Desc     Login User
//@Route    POST/api/v1/auth/login
//@access   Public

export const login = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;

  //Validate Phone number&password
  if (!phone || !password) {
    res.send
    //  return next(new ErrorResponse('Please provide an email and password', 400));
    res.status(400).send('Please provide an email or phone or username and password');
  }

  //check for user
  // const user = await User.findOne({ phone  }).select('+password');
  const user = await User.findOne({ $or: [{
    "email": phone
  }, {
    "phone": phone
  }, 
  {
    "username": phone
  }
]}).select('+password');

  if (!user) {
    //  return next(new ErrorResponse('Invalid Credentials', 401));
    res.status(401).send('Invalid Credentials');
  }

  //Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401).send('Invalid Credentials');
    //return next(new ErrorResponse('Invalid Credentials', 401));
  }

  //Create Token
  const token = user.getSignedJwtToken();
  const refreshToken = user.getRefreshJwtToken();

  res.status(200).json({
    sucess: true, data: {
      accessToken: token, refreshToken: refreshToken, expire: process.env.JWT_EXPIRE,
      user: user
    }
  })

  // sendTokenResponse(user, 200, res)

});

export const refreshToken = (req, res, next) => {
  const refreshTokens = req.body.token;
  console.log(refreshTokens)

  if (!refreshTokens) {
    return res.status(403).json({ msg: "User not authendicated" })
  }

  jwt.verify(refreshTokens, process.env.JWT_SECRET_REFRESH, (err, user) => {
    if (!err) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE
      });

      res.status(200).json({
        sucess: true, data: {
          accessToken: token, expire: process.env.JWT_EXPIRE
        }
      })
    } else {
      return res.status(403).json({ msg: err })
    }
  })
}

//Get token from model, create cookie and send response

//@Desc     Reset Password
//@Route    POST/api/v1/auth/resetpassword/:resettoken
//@access   Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  //Get Hasad token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');
  console.log(resetPasswordToken)
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });
  console.log(user)
  if (!user) {
    // return next(new ErrorResponse('Invalid Token', 400));
  }

  //Set New password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  user.otp = undefined
  await user.save();

  //Create Token
  const token = user.getSignedJwtToken();

  res.status(200).json({ sucess: true, token })

  // sendTokenResponse(user, 200, res)


})


const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  res.status(statusCode)
    .cookie('token', token, options)
    .json({ sucess: true, token })
};

//@Desc     ForgotPassword
//@Route    POST/api/v1/auth/forgetpassword/email
//@access   Public
//email 
export const forgetPasswordemail = asyncHandler(async(req, res, next)=>{

  const user = await User.findOne({ email: req.body.email })

  if(!user) {
       // return next(new ErrorResponse('There is no user with that email', 404));
}

  const otp = user.generateOTP()
  console.log(otp)
  await user.update({ otp, validateBeforeSave: false });
   const message = 'You are receving this email because your (or someone else) has requested the reset of a password. Your OTP for reset password is'+ otp
   

   try {
     
     await sendEmail({
       email: user.email,
       subject: 'Request reset Password',
       message
     });

     res.status(200).json({
       sucess:true, data:'Email Sent'
     })

   } catch (error) {

     user.resetPasswordToken = undefined;
     user.resetPasswordExpire = undefined;

     await user.save({ validateBeforeSave: false});

     // return next( new ErrorResponse('Email could not be sent', 500));
     
   }

   res.status(200).json({
       sucess:true,
       data:user
   })

  
 });

//through mobile
//@Route    POST/api/v1/auth/forgetpassword/mobile
export const forgetPasswordmobile = asyncHandler(async (req, res, next) => {
//number should start with 91...
  const user = await User.findOne({ phone: req.body.phone })
  if (!user) {
    //  return next(new ErrorResponse('There is no user with that email', 404));
  }
  console.log(user)
  //generate otp and sent sms
  const otp = user.generateOTP()
  console.log(otp)
  await user.update({ otp, validateBeforeSave: false });
  const to = user.code
  const from = "Kunye "
  const text = "your OTP is" + otp

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]['status'] === "0") {
        console.log("Message sent successfully.");
      } else {
        console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
      }
    }

  })

  res.status(200).json({
    sucess: true, data: 'OTP Sent to your mobile'
  })

}
)

//otp verification and send response token url 
//@Route    POST/api/v1/auth/otpverify
export const otpverification = asyncHandler(async (req, res, next) => {
  const user = await User.find({ otp: req.body.otp })
  console.log(user)
  const resetToken = user[0].getResetPasswordToken()
  await user[0].save({ validateBeforeSave: false })
  // const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

  // const message = `You are receving this email because your (or someone else) has requested the reset of a password.
  //   Please make a PUT request to:/n/n ${resetUrl}`;
  

  res.status(200).json({ msg: " your otp is successfully verified", resettoken: resetToken })
});




