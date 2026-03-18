import mongoose from "mongoose";

const ConnectedToMongoDBDataBase =async ()=>{
    mongoose.connection.on("connected",()=>{
      console.log("Data based connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}`)

}
export default ConnectedToMongoDBDataBase;