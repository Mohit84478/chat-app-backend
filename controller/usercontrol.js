import { user } from "../model/userdata";
import bcrypt from"bcryptjs"

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
            password:hashpass,
            gmail
        })



    } catch (error) {
        
    }
}
