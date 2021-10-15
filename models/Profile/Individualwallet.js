import mongoose from 'mongoose';


const IndividualwalletSchema = new mongoose.Schema({
 profileId:{
    type: mongoose.Schema.ObjectId,
    ref: 'Profile',
    required: true
 },
 shared:{
     type:Number
 },
 personal:{
     type:Number
 }
},
    { timestamps: true }
);


const Individualwallet = mongoose.model('Individualwallet',IndividualwalletSchema );
export default Individualwallet;