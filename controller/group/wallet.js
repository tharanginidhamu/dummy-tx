import mongoose from 'mongoose'
import { Server } from 'socket.io'
import { createServer } from 'http'
import http from 'http'
import express from 'express'
const app = express()
const server = http.createServer(app);
const io3 = new Server(server, { path: '/api/v1/wallet' });
io3.on("connection", socket => {
  console.log('helo group wallet connected')
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

var groupwalletSchema =  new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Profile'
      },
      groupId:{type:String},
      amount:{type:Number},
      billId:{type:String},
      decline:{type:Boolean}
}, { strict: false });
export var groupwallets = mongoose.model('groupwallets', groupwalletSchema);

io3.on('connection', (socket) => {
  socket.on('groupwallet', (msgs) => {
    io3.emit('walletbroadcast', { groupwallet: msgs })
    socket.emit('groupwallet', msgs)
    socket.broadcast.emit('groupwallet', msgs)
    console.log(msgs)
    var postgroupwallets = new groupwallets(
      {
        groupId: msgs.groupId,
        senderId: msgs.senderId,
        amount: msgs.amount,
        billId:msgs.billId,
        decline:msgs.decline,
        createdAt: new Date()
      }
    );
    postgroupwallets.save()
    

  })
})

export default io3
import asyncHandler from '../../middleware/async.js';
//get messages
export const getGroupwallet = asyncHandler(async(req, res, next)=>{
    const group = await groupwallets.find({groupId:req.params.groupId}).populate('senderId')
    res.status(200).json({
        
        succes:true,
        msg:group
    })
})
