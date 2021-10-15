import asyncHandler from '../../middleware/async.js';
import Individualwallet from '../../models/Profile/Individualwallet.js'

export const postwallet = asyncHandler(async (req, res, next) => {

    const individualwallet = await Individualwallet.create(req.body)
    res.status(200).json({
    succes:true,msg:individualwallet

    })
})


export const getwallet = asyncHandler(async(req, res, next)=>{
        const individualwallet = await Individualwallet.find({profileId:req.params.profileId})
      
       res.status(200).json({
           succes:true, msg:individualwallet
       })
    
});

export const updatewallet = asyncHandler(async (req, res, next) => {
    const individualwallet = await Individualwallet.findByIdAndUpdate(req.params.id, 
    req.body,{
        new: true,
        runValidators: true
    })
    if (!individualwallet) {
        res.status(400).json({
            sucess: false,
        })
    }
    res.status(200).json({
        sucess: true,
        data: individualwallet
    })
})



export const deletewallet =  asyncHandler(async(req, res, next)=>{

    const individualwallet = await Individualwallet.findByIdAndDelete(req.params.id);
    res.status(200).json({
        sucess:true,
        data:'Deleted'
    })
  
})