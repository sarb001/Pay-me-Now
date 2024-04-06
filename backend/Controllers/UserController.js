import User from "../Schemas/UserSchemas.js"
import bcrypt from 'bcrypt';

export const SignupUser = async(req,res) => {
    try {
        const { username , firstname ,lastname , password } = req.body;
        console.log('signup data =',username , firstname ,lastname , password);

        if(!username || !firstname || !lastname || !password){
             return res.status(400).json({
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
        
    } catch (error) {
        
    }
}