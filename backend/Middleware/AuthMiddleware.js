import User from "../Schemas/UserSchemas.js"
import jwt from 'jsonwebtoken' ;


export const authMiddleware = async(req,res,next) => {
    console.log('inside Middleware');
    const authHeaders = req.headers.authorization;
    console.log('headerss =',authHeaders);
    
    if(!authHeaders) return res.status(403).json({
        message : "Headers not provided"
    });
    
    const token = authHeaders.split(' ')[1];
    console.log('token found =',token);

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log('decoded auth =',decoded);
        req.userid =  decoded?.userid;

        next();

    } catch (error) {   
        console.log('error =',error);
    }
}