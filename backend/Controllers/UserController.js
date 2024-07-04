import User from "../Schemas/UserSchemas.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken' ;


export const SignupUser = async(req,res) => {
    try {
        const { username , fullname , email , password } = req.body;

        if(!username || !fullname || !email || !password){
             return res.status(404).json({
                 message : "Enter All Details"
             })
        }

        const bcryptpass = await bcrypt.hash(password,10);
        
        
        const  dbuser = await User.create({
            username,
            fullname,
            email,
            password : bcryptpass,
            accountBalance : 0
        });
        
        const user = await dbuser.save();

        return res.status(201).json({
               message : "User Created Successfully",
               user
        })

    } catch (error) {
        return res.json({
            message : "Unable to Create User"
        })
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

        if(!decryptpass){   
            return res.status(404).json({
                message : "Password Incorrect"
            })  
        }

        const token =  jwt.sign({userid : findUser._id},process.env.JWT_SECRET);
        if(!token){
            return res.status(400).json({
                message : "Token not Present"
            })
        }
        const user = findUser;

        return res.status(200).json({
            token,
            user
        })

    } catch (error) {
        return res.json({
            message : "Login Failed"
        })
    }
}

export const Logout = async(req,res) => {
    try {
        const userid = req.userid;
        
        const user = await User.findById(userid).select("-password");
        return res.status(200).json({
            message : " User Logged Out ",
            user : null
        })

    } catch (error) {
        return res.json({
            message : "Logout Failed"
        })
    }
}

export const Profile = async(req,res) => {
    try {

        const getUser = await User.findById(req.userid).select("-password");

        const user = getUser;

        res.status(200).json({
            message : "Profile Found",
            user
        })

    } catch (error) {
        return res.json({
            message : "Profile not Created"
        })
    }   
}

export const  UpdateProfile = async(req,res) => {
    try {

        const getUser = await User.findById(req.userid);

        const { firstname , lastname ,password } = req.body;

        if(!firstname || !lastname || !password){
            return res.status(404).json({
                message : "Enter All Details"
            })
        }

        if(firstname) getUser.firstname = firstname;
        if(lastname)  getUser.lastname  = lastname;
        if(password)  getUser.password  = password;
 
        const updatedUser = await getUser.save();

        return res.status(200).json({
            message : "Profile Updated",
            updatedUser
        })

    } catch (error) {   
        return res.json({
            message : "Profile not Updated"
        })   
    }   
}

export const  AllUsers = async(req,res) => {
    try {
        
        const loggedUserid = req?.userid;

        const querydata = req.query.filter || '';

        const FilteredData = await User?.find({   
            $or : [
                {
                    fullname :{ "$regex" : querydata }
                },
            ],
            _id : {
                "$ne" : loggedUserid
            }
        })


        res.status(200).json({
            message: " Get All Users",
            user : FilteredData
        })

    } catch (error) {   
        return res.json({
            message : "Users not Fetched"
        })
    }
}
