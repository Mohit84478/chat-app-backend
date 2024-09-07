import express from 'express';
import dotenv from 'dotenv'
import connectdb from './config/database.js';
import useroute from './routes/useroute.js'
import msgroute from './routes/mesroute.js'
import cookies from 'cookie-parser'
import isauth from './middleware/isauth.js';
dotenv.config({});
const app=express();
const port=process.env.port || 5000;
app.use(express.json())
app.use(cookies());
app.use("/api",useroute)
app.use("/api",isauth,msgroute)




app.listen(port,()=>{
    connectdb();    
    console.log(`server on ${port}`)
})