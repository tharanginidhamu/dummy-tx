import asyncHandler from '../middleware/async.js';
import Accountplaid from '../models/plaidaccont.js'


//post
export const postaccont = asyncHandler(async (req, res, next) => {
    const account = await Accountplaid.create(req.body);
    res.status(200).json({
        succes: true, msg: account
    })
})
//get 
export const fetchaccountbyid = asyncHandler(async (req, res, next) => {
    const account = await Accountplaid.findById(req.params.id)

    res.status(200).json({
        succes:true, msg:account
    })

});



//get all account
export const fetchall = asyncHandler(async (req, res, next) => {
    const acc = await Accountplaid.find()

    res.status(200).json({
        succes:true, msg:acc
    })

});

//get by query
export const fetchaccont = asyncHandler(async (req, res, next) => {
    const accont = await Accountplaid.find(req.query)

    res.status(200).json({
        succes:true , msg:accont
    })

});

//upadte 
export const ptaccont = asyncHandler(async (req, res, next) => {
    const accouunt = await Accountplaid.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!accouunt) {
        res.status(400).json({
            sucess: false,
        })
    }
    res.status(200).json({
        succes:true
    })
})

//Delete 

export const deleteaccount = asyncHandler(async (req, res, next) => {
    const acccc = await Accountplaid.findByIdAndDelete(req.params.id);
    res.status(200).json({
        sucess: true,
        data: 'Deleted'
    })

})

