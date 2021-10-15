import mongoose from 'mongoose';


const WalletSchema = new mongoose.Schema({
    groupId:{
        type: String,
        required:true
    },
    walletTotalamount:{
        type: String,
        required:true 
    },
    walletReceivedamount:{
        type: String,
        required:true
    },
},
    {timestamps:true}
);

const Wallet = mongoose.model('Wallet', WalletSchema);
export default Wallet;