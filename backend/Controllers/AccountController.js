
import mongoose from "mongoose";
import User from "../Schemas/UserSchemas.js";


//  pay | request money 

// pay-money / transfer money
// export const  transferMoney = async(req,res) => {
//     try {
//         const session = await mongoose.startSession();

//         session.startTransaction();
//         const { amount , to } = req.body;

//         if(isNaN(amount)){
//             return res.status(400).json({
//                 message : "Not a Number"
//             })
//         }

//      // use something else instead of Account ( not present )

//      console.log('req user id = ',req.userid);
//      const account  = await User.findOne({ _id : req.userid }).session(session);
            
//         // const account  = await Account.findOne({ userid : req.userid }).session(session);
//         console.log('sender acccount =',account);

//         // checking constriants 
//         if(!account ||  account.accountBalance < amount){
//             await session.abortTransaction();
//             return res.status(400).json({
//                 message : " Insufficient Balance "
//             })
//         }

//         console.log('to account =',to);

//         const toAccount = await User.findOne({ _id : to }).session(session);

//         // const toAccount = await Account.findOne({ userid : to }).session(session);
//         console.log('to acccount =',toAccount);

//         // check constraints 
//         if(!toAccount){
//             await session.abortTransaction();
//             return res.status(400).json({
//                 message : " Invalid Account "
//             }) 
//         }

//         await User.updateOne({ _id : req.userid } , { $inc : { accountBalance : -amount } }).session(session);
//         await User.updateOne({ _id : to }, { $inc : { accountBalance : amount } }).session(session);
        
//         await session.commitTransaction();

//         console.log('account login =',account);

//         res.status(200).json({
//             message : " Transfer Successful ",
//             account : account.accountBalance
//         })

//     } catch (error) {
//         console.log('transfer money error =',error);
//     }
// }


export const paymoney = async(req,res) => {
    try {
        
        const { amount , to } = req.body;

        if(isNaN(amount)){
          return res.status(400).json({
              message : "Not a Number"
          })
        }

        const userid = req.userid;
        console.log('userid= ',userid);
        const loggeduser = await User.findById(userid);
        console.log('logged user =',loggeduser);

         console.log('paytouser to=',to);

        const paytoUser = await User.findById(to);
        console.log('paytouser=',paytoUser);

        res.status(200).json({
            message :  "fetchedd"
        })

    } catch (error) {
        console.log('paymoney error =',error);
    }
}


// request money 
export const RequestMoney = async(req,res) => {
        try {

            // money amount entered = 1000,  loggeduser id 
            
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


    } catch (error) {
            console.log('all trans error',error);
    }
}
