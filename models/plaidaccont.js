import mongoose from 'mongoose';



const AccountplaidSchema = new mongoose.Schema({


    account_id: {
        type: String,

    },
    mobile:{
        type:Number
    },
    profile_id:{
        type:String
    },
    balances: {
        available: {
            type: Number,

        },
        current: {
            type: Number,

        },
        iso_currency_code: {
            type: String,

        },
        limit: {
            type: String,

        },
        unofficial_currency_code: {
            type: String
        }
    },
    mask: {
        type: String
    },
    name: {
        type: String
    },
    official_name: {
        type: String
    },

    subtype: {
        type: String
    },
    type: {
        type: String
    },

})


const Accountplaid = mongoose.model('Accountplaid', AccountplaidSchema);

export default Accountplaid;