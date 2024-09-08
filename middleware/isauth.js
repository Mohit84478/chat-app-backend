import jwt from "jsonwebtoken";
import cookie from 'cookie-parser';


const isauth = async (req, res, next) => {
    try {
       
        const token = req.cookies.token;
      
      

    
        if (!token) {
            return res.status(400).json({ message: "user not auth" })

        }
        const decode = await jwt.verify(token, process.env.jwtkey)
       
        
        if (!decode) {
            return res.status(400).json({ message: "invilad token" })

        }
        req.id = decode.userId

        next()
    } catch (error) {
        console.log(error)

    }

}
export default isauth;
