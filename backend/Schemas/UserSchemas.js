import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    username  : { type : String, required : true},
    firstname : { type :String,required : true},
    amount : { type : Number ,  required : true },
    tag : { type : String , enum : ["PAID","RECIEVED"] , required : true },
}, { timestamps : true })


const PaymentSchema = new mongoose.Schema({
    _id : { type  : String , required : true },
    username  : { type : String, required : true},
    firstname : { type :String,required : true},
    amount : { type : Number ,  required : true },
    status  : { type : String ,
     enum : ["PENDING","PAID","REJECT"] ,
     default : "PENDING",
     required : true },
}, { timestamps : true })


const UserSchema = new  mongoose.Schema({
    username  : { type : String, required : true },
    firstname : { type : String, required : true },
    lastname  : { type : String, required : true },
    password : {
        type : String,
        required : true,
        minLength : [6 , "Password must be  atleast 6 characters"]
    },
    accountBalance : { type : Number ,required : true },
    transactions: { type : [TransactionSchema] },
    sentRequest : { type : [PaymentSchema] },
    recievedRequest : { type : [PaymentSchema] },
},
{ timestamps : true});


const User =  mongoose.model('User',UserSchema);
export default User;

