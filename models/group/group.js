import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
    groupname: {
        type: String,
        required: [true, 'Please Add Group Nmae']
    },
    groupicon: {
        type: String,
        default: 'no-phor.jpg'
    },
    groupUrl: {
        type: String,
        default: 'no-phor.jpg'
    },
    superAdmin: {
        type: mongoose.Schema.ObjectId,
        ref: 'Profile',
        required: true
    },
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: 'Profile',
        required: true
    },
    created: {
        type: Boolean,
        default: true
    },
}
//  {
//     toObject: { virtuals: true },

//     toJSON: { virtuals: true }
// }

);
// GroupSchema.virtual('walletdetails',
//     {
//         ref: 'groupwallets',
//         localField: '_id',
//         foreignField: 'groupId',
//         justOne: false
//     })
   
const Group = mongoose.model('Group', GroupSchema);
export default Group;