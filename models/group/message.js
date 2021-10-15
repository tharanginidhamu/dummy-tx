import mongoose, { mongo } from 'mongoose';


const GroupMessageSchema = new mongoose.Schema({

    groupId:{
        type:String,
        required:true
    },
    senderId:{
        type:String,
        required: true
    },
    text:{
        type:String,
        required: true
    },
    firstname:{
        type:String,
        required: true
    },
    lastname:{
        type:String,
        required: true
    }
})