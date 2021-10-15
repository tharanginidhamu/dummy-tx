import asyncHandler from '../../middleware/async.js';
import Conversation from '../../models/chat/conversation.js';
import { Message } from '../../server.js';

export const postConversation = asyncHandler(async (req, res, next) => {

    const conversation = await Conversation.create({
        members: [req.body.senderId, req.body.receverId],
        recever:req.body.receverId,
        sender: req.body.senderId

    });
    res.status(200).json({
    succes:true,msg:conversation

    })
})


export const getConversation = asyncHandler(async(req, res, next)=>{
    let dummy = {members:{ $all:[req.params.senderId,req.params.receverId]}}
    console.log(dummy)
        const conversation = await Conversation.find(dummy).sort({updatedAt:-1}).populate('recever')
      
       res.status(200).json({
           succes:true, msg:conversation
       })
    
});
export const getUserConversation = asyncHandler(async(req, res, next)=>{
    const dummy = {members:{ $in:[req.params.senderId]}}
    
        const conversation = await Conversation.find(dummy).sort({updatedAt:-1}).populate('recever').populate('sender')
       res.status(200).json({
        succes:true, msg:conversation,
    })
})


export const deleteconversation =  asyncHandler(async(req, res, next)=>{
    let dummy = req.params.id
    const conversation = await Conversation.findByIdAndDelete(req.params.id);
    const messages = await Message.deleteMany({ conversationId: dummy })
    console.log(messages)
    res.status(200).json({
        sucess:true,
        data:'Deleted'
    })
  
})