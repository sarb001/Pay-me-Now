import User from "../Schemas/UserSchemas.js"
import jwt from 'jsonwebtoken' ;


export const authMiddleware = async(req,res,next) => {
    const authHeaders = req.headers.authorization;
    
    if(!authHeaders) return res.status(403).json({
        message : "Headers not provided"
    });
    
    const token = authHeaders.split(' ')[1];

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userid =  decoded?.userid;

        next();

    } catch (error) {   
        return  console.log('middleware error =',error);
    }
}