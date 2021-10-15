import mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    profileId: {
        type: String
    },
    accountNumber: {
        type: String,
        default: function increment() {
            increment.n = increment.n || 6680898790900;
            return ++increment.n;
        }
    },
    bankname: {
        type: String,
        default: function ranfom() {
            for (var i = 0; i < 4; i++) {
                var count = 0;
                // var loopEnd = Math.floor(Math.random() * 20 + 1);
                var loopEnd = Math.floor((Math.random() * 5) + 1);
                for (var j = 0; j < loopEnd; j++) {
                    count++;
                }
                // console.log(count);

                if (count == 1) {
                    var bank = "Indian Bank"
                    return bank;
                }
                if (count == 2) {
                    var bank = "State Bank"
                    return bank;
                }
                if (count == 3) {
                    var bank = "Axis Bank"
                    return bank;
                }
                if (count == 4) {
                    var bank = "Indian Overseas Bank"
                    return bank;
                }
                if (count == 5) {
                    var bank = "HDFC Bank"
                    return bank;
                }

            }


        }

    },
    cardtype: {
        type: String,
        default: function randomcard() {
            for (var i = 0; i < 3; i++) {
                var counting = 0;
                // var loopEnd = Math.floor(Math.random() * 20 + 1);
                var loopEnd = Math.floor((Math.random() * 3) + 1);
                for (var j = 0; j < loopEnd; j++) {
                    counting++;
                }
                // console.log(counting);

                if (counting == 1) {
                    var bank = "Master card"
                    return bank;
                }
                if (counting == 2) {
                    var bank = "VISA"
                    return bank;
                }
                if (counting == 3) {
                    var bank = "RuPay"
                    return bank;
                }

            }


        }
    },
    cardno: {
        type: String,
        default: function increment() {
            increment.n = increment.n || 6680898790907896;
            return ++increment.n;
        }
    },
    isactive: {
        type: Boolean,
        default: true
    },
    balance: {
        type: String,
        default: function balance() {

            return Math.floor((Math.random() * 50000) + 10000)
        }
    }


},
    { timestamps: true }
);

const Account = mongoose.model('Account', AccountSchema);
export default Account;