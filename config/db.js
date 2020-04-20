const mongoose = require('mongoose');
const URI = "mongodb+srv://longtv123:longtv123@snackhack-ttv65.mongodb.net/test?retryWrites=true&w=majority" 

const ConnectDB = async() =>{
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
    console.log("db connecting ...");
}

module.exports = ConnectDB;