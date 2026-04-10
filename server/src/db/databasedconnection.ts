import mongoose from "mongoose";

const ConnectedToMongoDBDataBase =async ()=>{
    mongoose.connection.on("connected",()=>{
      console.log("Databased connected ")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}`)

}
export default ConnectedToMongoDBDataBase;
