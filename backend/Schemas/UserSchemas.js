import mongoose from "mongoose";

const UserSchema = new  mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    firstname : {
        type :String,
        required : true,
    },
    lastname : {
        type :String,
        required : true
    },
    password : {
        type : String,
        required : true,
        minLength : [6 , "Password must be  atleast 6 characters"]
    }
});

const User =  mongoose.model('User',UserSchema);
export default User;

