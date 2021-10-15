import asyncHandler from '../../middleware/async.js';
import GroupConversation from '../../models/group/conversation.js';




//create Conversation 

export const createConversation = asyncHandler(async(req, res, next)=>{
     const groupConversation = await GroupConversation.create({
         groupId:req.body.groupId,
         members:[ 
             req.body.user1,
             req.body.user2,
             req.body.user3,
             req.body.user4,
             req.body.user5,
             req.body.user6,
             req.body.user7,
             req.body.user8,
             req.body.user9,
             req.body.user10,
            ],
             user1 : req.body.user1,
             user2 : req.body.user2,
             user3 : req.body.user3,
             user4 : req.body.user4,
            user5 : req.body.user5,
             user6 : req.body.user6,
             user7 : req.body.user7,
              user8 : req.body.user8,
              user9 : req.body.user9,
              user10 : req.body.user10
     })
     res.status(201).json({
        sucess:true,
        data:groupConversation
    })
})

//get Conversation

export const getConversation = asyncHandler(async( req, res, next)=>{
    
    let dummy = {members:{ $in:[req.params.userId]}}
    let user1 = req.body.user1;
    let user2 = req.body.user2;
    let user3 = req.body.user3;
    let user4 = req.body.user4;
    let user5 = req.body.user5;
    let user6 = req.body.user6;
    let user7 = req.body.user7;
    let user8 = req.body.user8;
    let user9 = req.body.user9;
    let user10 = req.body.user10;

    const getConversations = await GroupConversation.find(dummy).sort({updatedAt:-1})
    .populate('groupId')
    .populate('user1')
    .populate('user2')
    .populate('user3')
    .populate('user4')
    .populate('user5')
    .populate('user6')
    .populate('user7')
    .populate('user8')
    .populate('user9')
    .populate('user10')
    res.status(201).json({
        sucess:true,
        count:getConversations.length,
        data:getConversations
    })

})

//get group details
export const getConversationDetails = asyncHandler(async( req, res, next)=>{
    let user1 = req.body.user1;
    let user2 = req.body.user2;
    let user3 = req.body.user3;
    let user4 = req.body.user4;
    let user5 = req.body.user5;
    let user6 = req.body.user6;
    let user7 = req.body.user7;
    let user8 = req.body.user8;
    let user9 = req.body.user9;
    let user10 = req.body.user10;

    const getConversations = await GroupConversation.find(
        {
            groupId:req.params.groupId
        }
    ).sort({updatedAt:-1})
    .populate('groupId')
    .populate('user1')
    .populate('user2')
    .populate('user3')
    .populate('user4')
    .populate('user5')
    .populate('user6')
    .populate('user7')
    .populate('user8')
    .populate('user9')
    .populate('user10')
    res.status(201).json({
        sucess:true,
        data:getConversations
    })

})
///to remove a user from group
export const deleteuser = asyncHandler(async (req, res, next) => {
    let users = req.body
    let id = users.members
    const finduser = await GroupConversation.find({ groupId: req.params.groupId })
    if (finduser[0].user1 == id) {
        var a = finduser[0].user1
        var b = { user1: a }
        console.log(a)
    }
    else if (finduser[0].user2 == id) {
        var a = finduser[0].user2
        var b = { user2: a }
        console.log(a)
        console.log(b)
    }
    else if (finduser[0].user3 == id) {
        var a = finduser[0].user3
        var b = { user3: a }
        console.log(a)
        console.log(b)
    }
    else if (finduser[0].user4 == id) {
        var a = finduser[0].user4
        var b = { user4: a }
        console.log(a)
        console.log(b)
    }
    else if (finduser[0].user5 == id) {
        var a = finduser[0].user5
        var b = { user5: a }
        console.log(a)
        console.log(b)
    }
    else if (finduser[0].user6 == id) {
        var a = finduser[0].user6
        var b = { user6: a }
        console.log(a)
        console.log(b)
    }
    else if (finduser[0].user7 == id) {
        var a = finduser[0].user7
        var b = { user7: a }
        console.log(a)
        console.log(b)
    }
    else if (finduser[0].user8 == id) {
        var a = finduser[0].user8
        var b = { user8: a }
        console.log(a)
        console.log(b)
    }
    else if (finduser[0].user9 == id) {
        var a = finduser[0].user9
        var b = { user9: a }
        console.log(a)
        console.log(b)
    }
    else if (finduser[0].user10 == id) {
        var a = finduser[0].user10
        var b = { user10: a }
        console.log(a)
        console.log(b)
    }
    //remove the user profile found above and also pull the id from the array members
        const upadteuser = await GroupConversation.find({ groupId: req.params.groupId }).updateOne({}, { $unset: b }).updateOne({}, { $pull: users }, { multi: true })
    res.status(201).json({
        sucess: true,
        data: { msg: 'removed a user', data: upadteuser }
    })

})

//to add a user in group
export const addmembers = asyncHandler(async (req, res, next) => {
    let dummy = req.body
    var k = dummy.members
    console.log(k)
    // //find the user which is null
    const adduserdetais = await GroupConversation.find({ groupId: req.params.groupId })
    // check from 1 to 10 user
    if (adduserdetais[0].user1 == null) {
        var a = { user1: k }
        console.log(a)
    } else if (adduserdetais[0].user2 == null) {
        var a = { user2: k }
        console.log(a)
    } else if (adduserdetais[0].user3 == null) {
        var a = { user3: k }
        console.log(a)
    } else if (adduserdetais[0].user4 == null) {
        var a = { user4: k }
        console.log(a)
    } else if (adduserdetais[0].user5 == null) {
        var a = { user5: k }
        console.log(a)
    } else if (adduserdetais[0].user6 == null) {
        var a = { user6: k }
        console.log(a)
    } else if (adduserdetais[0].user7 == null) {
        var a = { user7: k }
        console.log(a)
    } else if (adduserdetais[0].user8 == null) {
        var a = { user8: k }
        console.log(a)
    } else if (adduserdetais[0].user9 == null) {
        var a = { user9: k }
        console.log(a)
    } else if (adduserdetais[0].user10 == null) {
        var a = { user10: k }
        console.log(a)
    }

    // populate the user profile for the user found above and push the new member to members array                                                            
    const populate = await GroupConversation.find({ groupId: req.params.groupId }).updateOne({ $set: a }).updateOne({}, { $pull: { members: null } }, { multi: true })
    const add = await GroupConversation.find({ groupId: req.params.groupId }).updateOne({}, { $push: req.body }, { $set: req.body })
    res.status(201).json({
        sucess: true,
        data: { msg: 'members added to the group', data: add }
    })
})