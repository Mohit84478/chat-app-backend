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
message:{
   type:String,
    require:true
},

 
},{timeseries:true})
export const messagec=mongoose.model("messagec",msgmodel);