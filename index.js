import express from 'express';
import dotenv from 'dotenv'
import connectdb from './config/database.js';
dotenv.config({});
const app=express();
const port=process.env.port || 5000;
 



app.listen(port,()=>{
    connectdb();    
    console.log(`server on ${port}`)
})