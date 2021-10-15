import mongoose from 'mongoose';


const ProfileSchema = new mongoose.Schema({

    firstname:{
        type: String,
        required: false,
       },
    
    lastname:{
        type: String,
        required: false,
        maxlength: [500, 'name cannot be more then 500']
    },
    language:{
        type: String,
        required: [false, 'Please Add Language'],

        
    },
    userid:{
       type: String,
       required:true
    },
    mobile:{
        type: String,
        required:[ false, 'Please Enter number'],
        maxlength: [15, 'entered 15 number only']
    },
    email:{
        type: String,
        match:[ 
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please Enter valied email id'
        ]
    },
     streetaddress:{
        type: String,
         required: [false, 'Please Add Street Address']

     },
     location:{
        type: String,
         required: [false, 'Please Add Location']
     },
     pushToken:{
         type:String,
         required:false,
     },
     plaid_access_token:{
         type:String
     },
     city:{
        type: String,
        required: [false, 'Please Add City']
     },
     country:{
        type: String,
         required: [false, 'Please Add Country']
     },
     birthday:{
        type:String,
        required: [false, 'Please Add Birthday']
     },
     photo: {
        type: String,
        default: 'no-photo.jpg'
      },
      photoUrl: {
        type: String,
        default: 'no-photo.jpg'
      },
     gender:{
        type: String,
        required: [false, 'Please Add Gender']
     },
     description:{
        type: String,
        required: [false, 'Please Add Description']
     },
     policies:{
        type: Boolean,
        default:false
     },
     createdAt:{
         type:Date,
         default: Date.now
     }
})



const Profile= mongoose.model('Profile', ProfileSchema);

export default Profile;