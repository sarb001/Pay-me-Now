import User from "../Schemas/UserSchemas.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken' ;


export const SignupUser = async(req,res) => {
    try {
        const { username , fullname , email , password } = req.body;
        console.log('signup data =',username , fullname , email , password);

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

        const user = findUser;

        return res.status(200).json({
            token,
            user
        })

    } catch (error) {
        console.log('error =',error);
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
            console.log('logout failed ',error);
    }
}

export const Profile = async(req,res) => {
    try {
        console.log('requested user =',req.userid);

        const getUser = await User.findById(req.userid).select("-password");
        console.log('getUser =',getUser);

        const user = getUser;

        res.status(200).json({
            message : "Profile Found",
            user
        })

    } catch (error) {
        console.log('error =',error);
    }   
}

export const  UpdateProfile = async(req,res) => {
    try {

        const getUser = await User.findById(req.userid);
        console.log('getUser =',getUser);

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
     console.log('error =',error);        
    }   
}

export const  AllUsers = async(req,res) => {
    try {
        
        const loggedUserid = req?.userid;
        console.log('logged userid=',loggedUserid);

        const querydata = req.query.filter || '';
        console.log('query =',querydata);

        const FilteredData = await User?.find({   
            $or : [
                {
                    firstname :{ "$regex" : querydata }
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
            console.log('Bulk Users error =',error);
    }
}
