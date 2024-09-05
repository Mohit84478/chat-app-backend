import mongoose, { Types } from "mongoose";
const chatmsg=new mongoose.Schema({
chatpersons:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    
}],
messages:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"usmessageer",
}]

 
},{timeseries:true})
export const chatmodel=mongoose.Schema("chatmodel",chatmsg);