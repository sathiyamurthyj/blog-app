const mongoose = require("mongoose");

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database connected: ${connect.connection.host}`);
    }        
    catch (error) {
        console.log("Error connecting to database",error.message);
        process.exit(1);
    }
}

module.exports = connectDB;