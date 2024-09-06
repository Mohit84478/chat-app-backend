import { user } from "../model/userdata.js";
import bcrypt from"bcryptjs"
import jwt from 'jsonwebtoken'

export const register=async (req,res) => {
    try {
        const{fullname,username,password,conformpassword,gmail}=req.body;
        if (!fullname||!username||!password||!conformpassword||!gmail) {
            return res.status(400).json({message:"all field required"})
            
        }  
        if (password !=conformpassword) {
            return res.status(400).json({message:"password not match"})

        }
        const users=await user.findOne({username});
        if (users) {
            return res.status(400).json({message:`${username} is exist`})

            
        }
        const hashpass=await bcrypt.hash(password,10)
        await user.create({
            fullname,
            username,
            password,
            gmail
        })
    return res.status(200).json({message:"account open susccefully"})


    } catch (error) {
        console.log(error)
    }
}
    export const  login= async (req,res) => {
        try {
            const{username,password}=req.body;
            if (!username||!password) {
                return res.status(400).json({message:"all field required"})
            }
                const usern=await user.findOne({username})
                
                if (!usern) {
                    return res.status(400).json({message:"user not exist or incrocet usename", success:false})
                   
                }
                
                // const Passwordm = await bcrypt.compare( "password",user.Password)  
                const Passwordm=await user.findOne({password})
                
                if (!Passwordm) {
                    return res.status(400).json({message:"passwowrnt not match or incrocet ", success:false})
                   
                };
                      const  tokendata={
                        userid:user.id
                      }
                      
                   
                      const token=await jwt.sign(tokendata,process.env.jwtkey,{expiresIn:'1d'})
                      
                      console.log({_id:user.id,
                          username:user.username,
                          fullname:user.fullname})
                      return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,}).json({
                          _id:user.id,
                          username:user.username,
                          fullname:user.fullname
                        });
        } catch (error) {
            console.log(error)
        }
        
    }
    export const logout =async (req,res) => {
        try {
            return res.status(200).cookie("token","",{maxAge:0}).json({
                message:"logout "
            })
        } catch (error) {
            console.log(error)
        }
        
    }
export const otheruse=async (req,res) => {
    try {
        const loginuser=req.id
        console.log(loginuser)
        const otherusers=await user.find({id:{$ne:loginuser}}).select("-password")
        return res.json(otherusers)
    } catch (error) {
        
    }
    
}