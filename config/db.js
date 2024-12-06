const mongoose = require('mongoose');

const initiateDBConnection = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION_URL);
        console.log('connected to db server');

    }catch(error){
        console.log(error);
    }
};

//make the function a default export
module.exports=initiateDBConnection;