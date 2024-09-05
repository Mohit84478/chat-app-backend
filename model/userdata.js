import mongoose, { Types } from "mongoose";
const usermodel=new mongoose.Schema({
fullname:{
    type:String,
    require:true
},
username:{
    type:String,
    require:true,
    unique:true
},
gmail:{
    type:String,
    require:true
},
password:{
    type:String,
    require:true
},
 
},{timeseries:true})
export const user=mongoose.Schema("user",usermodel);