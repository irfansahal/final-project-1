 import mongoose from "mongoose";

 const getMongoURI = () => {
    if(process.env.NODE_ENV === "development"){
      return ( 
         process.env.MONGO_DEV_URI || 
         `mongodb://localhost:27017/final-project`
      );
    }
    return process.env.MONGODB_URI
 }

 const MongoDB_URI = getMongoURI();

  if(!MongoDB_URI){
     throw new Error(`Please defaine the MONGODB_URI envioronment`);
  }

 let cashed = global.mongoose

 if(!cashed){
     cashed = global.mongoose = { conn : null , promise : null };
 }

  const connectDB = async () => {
     if(cashed.conn){
       return cashed.conn
     }
     if(!cashed.promise){
        const opts = {
           bufferCommands : false,
           maxPoolSize : 10,
           serverSelectionTimeoutMS : 5000,
           socketTimeoutMs : 45000, 
        }

        cashed.promise = mongoose 
        .connect(MongoDB_URI , opts)
        .then((mongoose)=>{
            console.log("Successfully Connected MONGODB_URI");
            return mongoose;
        });
     }

     try {
        cashed.conn = await cashed.promise
     } catch (error) {
        cashed.promise = null;
        console.log(`MongoDB connection failed`);
        throw error
     }
     return cashed.conn;
  }

  export default connectDB;