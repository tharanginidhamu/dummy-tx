import crypto from 'crypto'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const UserSchema = new mongoose.Schema({

    firstname:{
        type:String,
        required: [true, 'Please add a Firstname'],
        maxlength: [45, 'name cannot be more then 45']

    },
    lastname:{
        type:String,
        required: [true, 'Please add a lastname'],
        maxlength: [45, 'name cannot be more then 45']
    },
    email:{
        type:String,
        required: [ true, 'Please add email'],
        unique:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add valid email'
        ]
    },
    username:{
        type:String,
        required: [ true, 'Please add username'],
        unique:true,
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default: 'user'
    },
    phone:{
        type: String,
        unique:true,
        required:[ true, 'Please Enter number'],
        maxlength: [15, 'entered 15 numbers only']
    },
    code:{
        type: String,
        required:[ true, 'Please Enter Code'],
       
    },
    password:{
        type:String,
        required: [ true, 'Please enter the password'],
        minlength:6,
        select:false
    },
    policies:{
        type: Boolean,
        default:false
     },
     otp:String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt:{
        type:Date,
        default: Date.now
    }
});

//Encrypt password using bcrypt
UserSchema.pre('save', async function(next){

    if(!this.isModified('password')){
     next()
    } 

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
};
UserSchema.methods.getRefreshJwtToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_REFRESH,{
        expiresIn:process.env.JWT_REFRESH_EXPIRE
    });
};
//genrate OTP
UserSchema.methods.generateOTP=function() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

//Match user entered password to hased password in database
UserSchema.methods.matchPassword = async function(enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password);
};

//Generate and hash password token
UserSchema.methods.getResetPasswordToken = function() {

    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    //Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto.
        createHash('sha256')
        .update(resetToken)
        .digest('hex')

    //set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model('UserModel', UserSchema);

export default User;