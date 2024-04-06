import User from "../Schemas/UserSchemas.js"

export const SignupUser = async(req,res) => {
    try {
        const { username , firstname ,lastname , password } = req.body;
        console.log('signup data =',username , firstname ,lastname , password);

        if(!username || !firstname || !lastname || !password){
             return res.status(400).json({
                 message : "Enter All Details"
             })
        }

        const  dbuser = await User.create({
            username,
            firstname,
            lastname,
            password
        });

        const user = await dbuser.save();

        return res.status(201).json({
            message : "User created Successfully",
            user
        });

    } catch (error) {
        return console.log('error =',error);
    }
}

export const LoginUser = async(req,res) => {
    try {
        
    } catch (error) {
        
    }
}