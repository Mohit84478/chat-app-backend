import jwt from "jsonwebtoken";



const isauth=async (req,res,next) => {
    try {
         const token=req.cookies.token;
       
         if (!token) {
            return res.status(400).json({message:"user not auth"})
            
         }
         const decode= await  jwt.verify(token,process.env.jwtkey)
         console.log(decode.id)
         if (!decode) {
            return res.status(400).json({message:"invilad token"})
            
         }
         req.id=decode.id
         
         next()
    } catch (error) {
        console.log(error)

    }
    
}
export default isauth;
