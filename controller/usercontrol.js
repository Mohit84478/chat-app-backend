import { user } from "../model/userdata.js";
import bcrypt from"bcryptjs"
import jwt from 'jsonwebtoken'

export const register=async (req,res) => {
    try {
        const{fullname,username,password,conformpassword,gmail}=req.body;
        if (!fullname||!username||!password||!conformpassword||!gmail) {
            return res.status(400).json({message:"all field required"})
            
        }  
        if (password !== conformpassword) {
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
            password:hashpass,
            gmail
        })
    return res.status(200).json({message:"account open susccefully"})


    } catch (error) {
        console.log(error)
    }
}
    export const  login= async (req,res) => {
        try {
            const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        };
        const User = await user.findOne({ username });
        if (!User) {
            return res.status(400).json({
                message: "Incorrect username ",
                success: false
            })
        };
        const isPasswordMatch = await bcrypt.compare(password, User.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })
        };
        const tokenData = {
            userId: User._id
        };
        

        const token = await jwt.sign(tokenData, process.env.jwtkey, { expiresIn: '1d' });
       

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: User._id,
            username: User.username,
            fullName: User.fullName
          
        });
    } catch (error) {
        console.log(error)
    }
    console.log("hello")
        
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
        const loggedInUserId = req.id;
        const otherUsers = await user.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    }catch (error) {
        
    }
    
}