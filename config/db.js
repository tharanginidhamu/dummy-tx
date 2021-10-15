import mongoose from 'mongoose';


const ConnectDB = async() =>{
    const Connection = await mongoose.connect(process.env.MONGO_CONNECT, {
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true,
        
    })

    console.log(`Mongoose COnrct ${Connection.connection.host}`)
};

export default ConnectDB;