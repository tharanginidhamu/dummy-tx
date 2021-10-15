// import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../../middleware/async.js'
import Profile from '../../models/Profile/Profile.js';
import Account from '../../models/Profile/Account.js';



// @route     GET /api/v1/profile
// @access    Public

export const getProfile = asyncHandler(async(req, res, next)=>{
    let token = req.headers["authorization"];
    const Profiles = await Profile.find({userid : req.user.id});
    return res.status(200).json({
        success: true,
        count: Profiles.length,
        data: Profiles
      });

})
//get all profile
export const getAllProfile = asyncHandler(async(req, res, next)=>{
    const Profiles = await Profile.find();
    return res.status(200).json({
        success: true,
        count: Profiles.length,
        data: Profiles
      });
})


export const postProfile= asyncHandler(async(req, res, next)=>{
    console.log(req.body)
    const profiles= await Profile.create({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      language:req.body.language,
      photoUrl:req.body.photoUrl,
      userid:req.user.id,
      mobile:req.body.mobile,
      email:req.body.email,
       streetaddress:req.body.streetaddress,
       location:req.body.location,
       city:req.body.city,
       country:req.body.country,
       birthday:req.body.birthday,
       gender:req.body.gender,
       description:req.body.description,
       policies:req.body.policies
    });
    console.log(profiles)
    // const account = await Account.create({profileId:Profiles._id})
    res.status(200).json({
        sucess:true,
        data:profiles
    })

})



    export const putProfile= asyncHandler(async(req, res, next)=>{
   
      const singleProfile= await Profile.findByIdAndUpdate(req.params.id, req.body, {
          new:true,
          runValidators:true

      });
      if(!singleProfile){
          res.status(400).json({
              sucess:false,
          })
      }
      res.status(200).json({
          sucess:true,
          data:singleProfile
      })
 
 
})

export const deleteProfile= asyncHandler(async(req, res, next)=>{
   
  const deleteUser = await Profile.findByIdAndDelete(req.params.id);

  res.status(200).json({
      sucess:true,
      data:'Deleted'
  })

})
