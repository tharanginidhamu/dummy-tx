import mongoose from 'mongoose';


const ConversationSchema = new mongoose.Schema({
    groupId:{
        type: mongoose.Schema.ObjectId,
        ref:'Group',
        required:true
    },

  members:{type:Array},
   user1:{
    type: mongoose.Schema.ObjectId,
    ref:'Profile',
    required:false
   },
   user2:{
    type: mongoose.Schema.ObjectId,
    ref:'Profile',
    required:false
   },
   user3:{
    type: mongoose.Schema.ObjectId,
    ref:'Profile',
    required:false
   },
   user4:{
    type: mongoose.Schema.ObjectId,
    ref:'Profile',
    required:false
   },
   user5:{
    type: mongoose.Schema.ObjectId,
    ref:'Profile',
    required:false
   },
   user6:{
    type: mongoose.Schema.ObjectId,
    ref:'Profile',
    required:false
   },
   user7:{
    type: mongoose.Schema.ObjectId,
    ref:'Profile',
    required:false
   },
   user8:{
    type: mongoose.Schema.ObjectId,
    ref:'Profile',
    required:false
   },
   user9:{
    type: mongoose.Schema.ObjectId,
    ref:'Profile',
    required:false
   },
   user10:{
    type: mongoose.Schema.ObjectId,
    ref:'Profile',
    required:false
   },
   lastText:{
       type:String
   }

    
},
{timestamps:true}
);

const GroupConversation = mongoose.model('GroupConversation', ConversationSchema);
export default GroupConversation;