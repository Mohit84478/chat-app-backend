import mongoose from "mongoose";
const connectdb=async () => {
    await mongoose.connect(process.env.mongouri).then(()=>{
        console.log("db connect")
    }).catch((error)=>{
        console.log(error)
    })
}
export default connectdb;