import mongoose from 'mongoose'
import { Server } from 'socket.io'
import { createServer } from 'http'
import http from 'http'
import express from 'express'
import GroupConversation from '../../models/group/conversation.js'
const app = express()
const server = http.createServer(app);
const io2 = new Server(server, { path: '/api/v1/groupmessages' });
io2.on("connection", socket => {
  console.log('helo group socket connected')
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

var groupMessageSchema = mongoose.Schema({
  groupId: {
    type: String,
    required:true
  },
  conversationId: {
    type: String,
    required:true
  },
  senderId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Profile'
  },
  firstname: {
    type: String,
    required:true
  },
  lastname: {
    type: String,
    required:true
  },
  text: {
    type: String,
    required:true
  },
  fund:{type:Boolean},
  decline:{type:Boolean},
  billId:{type:String},
  bill:{
    fromdate:{type:String},
    duedate:{type:String},
    amount:{type:Number},
    members:{type: Array},
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

  }
}, {timestamps:true},{ strict: false });
export var groupMessages = mongoose.model('groupMessages', groupMessageSchema);

io2.on('connection', (socket) => {
  socket.on('groupmessage', (msgs) => {
    io2.emit('broadcast', { groupmessage: msgs })
    socket.emit('groupmessage', msgs)
    socket.broadcast.emit('groupmessage', msgs)
    console.log(msgs)
    var postgroupMessage = new groupMessages(
      {
        groupId: msgs.groupId,
        conversationId: msgs.conversationId,
        senderId: msgs.senderId,
        firstname: msgs.firstname,
        lastname: msgs.lastname,
        text: msgs.text,
        fund:msgs.fund,
        billId:msgs.billId,
        decline:msgs.decline,
        bill:{
          fromdate:msgs.bill.fromdate,
    duedate:msgs.bill.duedate,
    amount:msgs.bill.amount,
          members:[ 
            msgs.bill.user1,
            msgs.bill.user2,
            msgs.bill.user3,
            msgs.bill.user4,
            msgs.bill.user5,
            msgs.bill.user6,
            msgs.bill.user7,
            msgs.bill.user8,
            msgs.bill.user9,
            msgs.bill.user10,
           ],
           user1 : msgs.bill.user1,
           user2 : msgs.bill.user2,
           user3 : msgs.bill.user3,
           user4 : msgs.bill.user4,
          user5 : msgs.bill.user5,
           user6 : msgs.bill.user6,
           user7 : msgs.bill.user7,
            user8 : msgs.bill.user8,
            user9 : msgs.bill.user9,
            user10 : msgs.bill.user10,
          createdAt: new Date()
        }
        
    }
    );
    postgroupMessage.save()
    GroupConversation.find({ "_id": msgs.conversationId }).lean().updateOne({}, { $set: { updatedAt: new Date(), "lastText": msgs.text } }, { multi: true })
      .exec(function (err, collection) {
        if (err) {
          console.log({ error: err })
        }
        else {
          console.log(collection)
        }
      })

  })
})

export default io2

import asyncHandler from '../../middleware/async.js';
//get messages
export const getGroupmsg = asyncHandler(async(req, res, next)=>{
    const group = await groupMessages.find({groupId:req.params.groupId})
    .populate('senderId')
    .populate('bill.user1')
    .populate('bill.user2')
    .populate('bill.user3')
    .populate('bill.user4')
    .populate('bill.user5')
    .populate('bill.user6')
    .populate('bill.user7')
    .populate('bill.user8')
    .populate('bill.user9')
    .populate('bill.user10')
    res.status(200).json({
        
        succes:true,
        msg:group
    })
})


