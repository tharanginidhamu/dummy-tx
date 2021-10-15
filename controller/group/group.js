import asyncHandler from '../../middleware/async.js';
import Group from '../../models/group/group.js'
import GroupConversation from '../../models/group/conversation.js';
import Wallet from '../../models/group/wallet.js';



//Post Group

export const createGroup = asyncHandler(async(req, res, next)=>{
    const group = await Group.create(req.body);
    res.status(200).json({
        succes:true,
        msg:group
    })
})

//Get group 

export const getGroup = asyncHandler(async(req, res, next)=>{
    const group = await Group.findById(req.params.id).populate('superAdmin').populate('admin')
    res.status(200).json({
        
        succes:true,
        msg:group
    })
})


//Put Group
 
export const putGroup = asyncHandler(async(req, res, next)=>{
    const group = await Group.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
          runValidators:true
    })
    if(!group){
        res.status(400).json({
            sucess:false,
        })
    }
    res.status(200).json({
        sucess:true,
        data:group
    })
})
//Image uPload
export const imgUpload = asyncHandler(async(req, res)=>{
    const group = await Group.findById(req.params.id);
    if (!group) {
      res.status(404).json({msg:'group Not fount'})
  }
  
    const url = req.protocol + '://' + req.get('host')
    const path = url + '/public/' + req.file.filename
  
    
    await Group.findByIdAndUpdate(req.params.id, { groupicon: path });
  
    res.status(200).json({
      success: true,
      data: path
    });
  
  });
//DeleteGroup

//DeleteGroup and chat and its conversation

export const deleteGroup =  asyncHandler(async(req, res, next)=>{
    let dummy = req.params.id
    const group = await Group.findByIdAndDelete(req.params.id);
    const groupconversation = await GroupConversation.deleteOne({ groupId: dummy })
    const groupmessage = await groupMessages.deleteMany({ groupId: dummy })
    const wallet = await Wallet.deleteOne({groupId: dummy})
    res.status(200).json({
        sucess: true,
        data: 'Deleted'
    })
  
})