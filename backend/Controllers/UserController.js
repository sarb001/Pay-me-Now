import User from "../Schemas/UserSchemas.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken' ;

export const SignupUser = async(req,res) => {
    try {
        const { username , firstname ,lastname , password } = req.body;
        console.log('signup data =',username , firstname ,lastname , password);

        if(!username || !firstname || !lastname || !password){
             return res.status(404).json({
                 message : "Enter All Details"
             })
        }

        const bcryptpass = await bcrypt.hash(password,10);

        const  dbuser = await User.create({
            username,
            firstname,
            lastname,
            password : bcryptpass
        });

        const user = await dbuser.save();

        return res.status(200).json({
               message : "User created Successfully",
               user
        })

    } catch (error) {
        return console.log('error =',error);
    }
}

export const LoginUser = async(req,res) => {
    try {
        const { username , password } = req.body;
        if(!username || !password){
            return res.status(404).json({
                message : "Enter All Details",
            })
        }

        const findUser = await User.findOne({username});

        if(!findUser){
            return res.status(404).json({
                message : "User not Found"
            })
        }

        const decryptpass = await bcrypt.compare(password ,findUser.password);
        console.log('decrypt pass =',decryptpass);

        if(!decryptpass){   
            return res.status(404).json({
                message : "Password Incorrect"
            })  
        }

        const token =  jwt.sign({userid : findUser._id},process.env.JWT_SECRET);
        console.log('token gen =',token);
        
        return res.status(200).json({
            // message : "User logged in",
            token,
        })

    } catch (error) {
        console.log('error =',error);
    }
}


export const Profile = async(req,res) => {
    try {
        console.log('requested user =',req.userid);

        const getUser = await User.findById(req.userid).select("-password");
        console.log('getUser =',getUser);

        res.status(200).json({
            message : "Profile Found"
        })

    } catch (error) {
        console.log('error =',error);
    }   
}