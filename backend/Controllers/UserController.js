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

        return res.status(200).json({message : "USer cc"});

        //  const dbUser = new User
    } catch (error) {
        console.log('error =',error);
    }
}

export const LoginUser = async(req,res) => {
    try {
        
    } catch (error) {
        
    }
}