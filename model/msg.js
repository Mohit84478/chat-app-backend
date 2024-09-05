import mongoose, { Types } from "mongoose";
const msgmodel=new mongoose.Schema({
senderid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    require:true
},
reciverid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    require:true
},
messagec:{
   type:String,
    require:true
},

 
},{timeseries:true})
export const message=mongoose.Schema("message",msgmodel);