import asyncHandler from '../../middleware/async.js';
import Account from '../../models/Profile/Account.js';



export const createaccount = asyncHandler(async(req, res, next)=>{
    const account = await Account.create(req.body);
    res.status(200).json({
        succes:true,
        msg:account
    })
})


//Get

export const getaccount = asyncHandler(async(req, res, next)=>{
    const account = await Account.find({profileId:req.params.profileId})
    res.status(200).json({
        
        succes:true,
        msg:account
    })
})


//Put 
 
export const putaccount = asyncHandler(async(req, res, next)=>{
    const account = await Account.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
          runValidators:true
    })
    if(!account){
        res.status(400).json({
            sucess:false,
        })
    }
    res.status(200).json({
        sucess:true,
        data:account
    })
})


export const deleteaccount =  asyncHandler(async(req, res, next)=>{
   
    const account = await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({
        sucess: true,
        data: 'Deleted'
    })
  
})