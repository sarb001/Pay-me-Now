
import mongoose from "mongoose";
import User from "../Schemas/UserSchemas.js";


//  pay | request money 

// pay-money / transfer money

export const paymoney = async(req,res) => {
    try {
        
        const { amount , to } = req.body;

        if(isNaN(amount)){  return res.status(400).json({ message : "Not a Number" })}

        const userid = req.userid;
        console.log('userid= ',userid);

        const user = await User.findById(userid);
        console.log('logged user =',user);

        console.log('paytouser to=',to);

        const paytoUser = await User.findById(to);
        console.log('paytouser=',paytoUser);

        
            // + add in accountbalance paytouser
        const updateUser = await User.findByIdAndUpdate(
            { _id :  userid },
            {  
                $push : {
                    transactions : {
                        username : paytoUser?.username,
                        fullname : paytoUser?.fullname,
                        amount : amount,
                        tag : "PAID",
                        date: new Date(Date.now()),
                    }
                },
                $inc : { accountBalance : -amount },
            },
            { new : true }
        )

            // - accountbalance from user 
        const updatepaytouser = await User.findByIdAndUpdate(
            {  _id :  to  },
            {
                $push: {
                    transactions : {
                        username : user?.username,
                        fullname : user?.fullname,
                        amount : amount,
                        tag : "RECIEVED",
                        date: new Date(Date.now()),
                    }
                },
                $inc : { accountBalance : +amount }
            }
        )

        res.status(200).json({
            message :  "Payment Successful",
            user : {
                username : updateUser?.username,
                fullname :updateUser?.fullname,
                email : updateUser?.email,
                accountBalance :updateUser?.accountBalance
            }
        })

    } catch (error) {
        console.log('paymoney error =',error);
    }
}


// request money 
export const RequestMoney = async(req,res) => {
        try {

            // money amount entered = 1000,  user id 
            
            // user whom to sent ( sender whom requesting )

            // update with schema 

            const user = await User.findById(user._id);
            console.log('main logged user =',user);

                // in frontend 
                // amount = amout from modal 
                // username = selected user to pay amount 

            const { amount , requestedusername } = req?.body;
            console.log('amount =',amount);
            console.log('requested user',requestedusername);

            if(amount <= 1){
                return res.status(400).json({
                    message : "Amount should be greator than 1"
                })
             }

             if(requestedusername == ''){
                return res.status(400).json({
                    message : "Enter a name to sent Request"
                })
             }


            const mainuser = await User.findOneAndUpdate(
            {
                username : requestedusername
            },
            {
                $push :{
                    recievedRequest : {         // id of logged user (  who sent  it )
                        _id : user?._id,
                        username : user?.username,
                        firstname : user?.firstname,
                        amount : amount,
                        status : "PENDING"       
                    } 
                }
            },{ new : true })

            console.log('main user ==',mainuser);

            res.status(200).json({
                 message: " Money Requested "
            })

        } catch (error) {
            console.log('request money error= ',error);  
        }
}


// sentrequest ==> show all  sent requests that are paid | rejected are made  ( username , amount )
        // sentrequest => PaymentSchema 
        //  PAID , PENDING , REJECTED

export const sentRequest = async(req,res) => {
            try {
        
            } catch (error) {
                console.log('sent request error =',error);
            }
}


//  In recieved  requests =>

// pay / reject

// pay => accept money
// rejectmoney => in recieving end  reject  so reject the money 

export const acceptmoney = async(req,res) => {
    try {
        
    } catch (error) {
        console.log('accept moneyerror =',error);
    }
}

export const  rejectmoney = async(req,res) => {
    try {
        
    } catch (error) {
        console.log('rejected money error =',error);
    }
}


// add money with modal and add it in  balance 
export const addMoney = async(req,res) => {
    try {
        
    } catch (error) {

    }
}

 // all transactions 
export const  AllTransaction = async(req,res) => {
    try {
        // money paid to  user will show here

        const user = await User.findById(req.userid);

        const AllTransaction = await User.findById(req.userid).select('transactions');
        console.log('allogged user transactions = ',AllTransaction);

        res.status(200).json({
            message :" All Transactions "
        })

    } catch (error) {
            console.log('all trans error',error);
    }
}
