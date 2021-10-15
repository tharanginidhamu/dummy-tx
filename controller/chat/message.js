import asyncHandler from '../../middleware/async.js';
import { Message } from '../../server.js';


export const getmessages = asyncHandler(async(req, res, next)=>{
    const group = await Message.find(req.query)
    res.status(200).json({
        
        succes:true,
        msg:group
    })
})







// import Message from '../../models/chat/messages.js';


// export default postMessage

// export const postMessage = asyncHandler(async(req, res, next)=>{

//     const message = await Message.create(req.body)

//     res.status(200).json({
//         success:true,
//         msg:message
//     })
// })

// export const getMessage = asyncHandler(async(req, res, next)=>{

//     const message = await Message.find({
//         conversationId:req.params.conversationId
//     });
//     res.status(200).json({
//         succes:true, msg:message
//     })
// })