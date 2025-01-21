const mongoose = require('mongoose');

const connection = { isConnected:null }

const connectDB = async () => {
    try{
        if (connection.isConnected) 
            return;

        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected = db.connections[0].readyState;
        console.log("db connected successfully");

    } catch(err) {
        console.log(`couldn't connect with db`);
    }
}

module.exports = connectDB;