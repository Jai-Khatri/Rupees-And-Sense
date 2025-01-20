import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const ConnectToDB = async() => {
    const connected = await mongoose.connect(process.env.MONGO_URL)

    if(connected){
        console.log("Connected to MONGODB database on:- " , mongoose.connection.host)
    }
}