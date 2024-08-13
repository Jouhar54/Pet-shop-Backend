const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB running ${connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB;