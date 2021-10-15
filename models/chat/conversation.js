import mongoose from 'mongoose';


const ConversationSchema = new mongoose.Schema({

    members: {
        type: Array,
    },

    recever: {
        type: mongoose.Schema.ObjectId,
        ref: 'Profile',
        required: true
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'Profile',
        required: true
    },
    lastText: {
        type: Object
    },
    created: {
        type: Boolean,
        default: true
    }


},
    { timestamps: true }
);


const Conversation = mongoose.model('Conversation', ConversationSchema);
export default Conversation;