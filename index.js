import express from 'express';
import dotenv from 'dotenv'
import connectdb from './config/database.js';
import useroute from './routes/useroute.js'
import msgroute from './routes/mesroute.js'
import cookie from 'cookie-parser'
import isauth from './middleware/isauth.js';
import cors from 'cors'
dotenv.config({});
const app=express();
const port=process.env.port || 5000;
  app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookie());
//  const corsname={
//     origin:'http://localhost:3000',
//     credentials: true
//  }
 app.use(cors({origin:'http://localhost:3000',
    credentials: true}))
app.use("/api",useroute)
app.use("/api",isauth,msgroute)




app.listen(port,()=>{
    connectdb();    
    console.log(`server on ${port}`)
})