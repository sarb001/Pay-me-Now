
import mongoose from "mongoose";
import User from "../Schemas/UserSchemas.js";

import { v4 as uuidv4 } from 'uuid' ;

export const  AllTransaction = async(req,res) => {
    try {
        const user = await User.findById(req.userid);

        res.status(200).json({
            message :" All Transactions ",
            user : user.transactions
        })

    } catch (error) {
        return res.json({
            message : "Transaction Error"
        })
    }
}


export const paymoney = async(req,res) => {
    try {
        
        const { amount , to } = req.body;

        if(isNaN(amount)){  return res.status(400).json({ message : "Not a Number" })}

        const userid = req.userid;

        const user = await User.findById(userid);


        const paytoUser = await User.findById(to);

        
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
                        tag : "RECEIEVED",
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
                accountBalance :updateUser?.accountBalance,
                transactions :updateUser?.transactions,
                sentRequest :updateUser?.sentRequest,
                recievedRequest :updateUser?.recievedRequest,
            }
        })

    } catch (error) {
        return res.json({
            message : "Money not Paid"
        })
    }
}


export const addMoney = async(req,res) => {
    try {
        const { modalamount  } = req.body;

        const user = await User.findById(req.userid);

        if(modalamount < 1 || modalamount == ' ') return res.json({         
            message : " Invalid Amount "
        });
                // 620 + 9900 = 
             const  mybal = user?.accountBalance + Number(modalamount);

             if(mybal != ''){
                user.accountBalance = mybal;
             }  
        
            await user.save();  

            return res.status(200).json({
                message : "Money added successfully",
                user  :{
                    accountBalance : mybal,
                    username : user?.username,
                    fullname :  user?.fullname,
                    email : user?.email,
                    transactions :user?.transactions,
                    sentRequest :user?.sentRequest,
                    recievedRequest :user?.recievedRequest,
                }
            })

    } catch (error) {
        return res.json({
            message : "Money not Added"
        })
    }
}


export const RequestMoney = async(req,res) => {
        try {
            
            const user = await User.findById(req.userid);

            const { modalamount , id , fullname } = req?.body;

            if(modalamount <= 1){
                return res.status(400).json({
                    message : "Amount should be greator than 1"
                })
             }

            const paymentid = new mongoose.Types.ObjectId(); 

                // amandeep 
            const recieveduser = await User.findOneAndUpdate({
                fullname : fullname
            }, {
                $push : {
                    recievedRequest : {
                        _id : paymentid,
                        username :user?.username,
                        amount :modalamount,
                        fullname :user?.fullname,
                        status : "PENDING"
                    }
                }
            },{ new : true })


            const mainuserupdated = await User.findOneAndUpdate(
                {_id : user?._id },
                {
                    $push :{
                        sentRequest : {       
                            _id : paymentid,
                            username : recieveduser?.username,
                            fullname : recieveduser?.fullname,
                            amount : modalamount,
                            status : "PENDING"       
                        } 
                    }
            },{ new : true })
    

            res.status(200).json({
                    message: " Money Requestedss ",
                    user : mainuserupdated
            })

        } catch (error) {
            return res.json({
                message : "Money Request Failed"
            })
        }
}


export const acceptmoney = async(req,res) => {
    try {
        
        const { amount , fullname , id } =    req?.body;

        const user = await User.findById(req?.userid);

        const payinguser = await User.findOne({fullname});
        // amandeep

        if(amount < 1 || amount == 0){
            return res.status(200).json({
                message: " Invalid-Amount "
            })
        }

        if(amount > payinguser?.accountBalance){
            return res.status(400).json({
                message: " Balance is not enough "
            })    
        }

        // if manveer loggedin 

        // then it is amandeep ( modal user )
         await User.updateOne({
            _id : payinguser?._id,            // amandeep id
            "sentRequest._id" :  id,    // modal id pay
        },
        {
            $set   : { "sentRequest.$.status" : "PAID" },
            $push  : {
                    transactions : {          
                        fullname : payinguser?.fullname,
                        username : payinguser?.username,
                        amount : payinguser?.amount,
                        tag : "RECEIEVED",
                        date : new Date(Date.now()),
                    },
            }, 
         $inc : { accountBalance : +amount },
        }) 

            // logged user manveer
         const updateduser  = await User.findByIdAndUpdate(
            user?._id
        ,{
            $push : {
                transactions :{           
                    username :  payinguser?.username,
                    fullname :  payinguser?.fullname,
                    amount,
                    tag : "PAID",
                    date : new Date(Date.now()),
                },
            },
            $pull: { recievedRequest : { _id : id }},
            $inc : { accountBalance : -amount }
        },{ new: true })  

      
        res.status(200).json({
            message :"Paid",
            user : {
                fullname : updateduser?.fullname,
                username : updateduser?.username,
                email : updateduser?.email,
                accountBalance: updateduser?.accountBalance,
                transactions : updateduser?.transactions,
                sentRequest : updateduser?.sentRequest,
                recievedRequest : updateduser?.recievedRequest,
            }
        })

    } catch (error) {
        return res.json({
            message : "Money Not Accepted"
        })
    }
}


export const  rejectmoney = async(req,res) => {
    try {
         
        const _id = req?.userid;        //logged user

        const { amount , id  , fullname } = req?.body;

        const loggeduser = await User.updateOne(        
        {
            fullname : fullname,
            "sentRequest._id" : id
        },{ $set  : { "sentRequest.$.status" : "REJECT" },}
        )
        
        const moneyreciever = await User.findByIdAndUpdate(
            _id
        ,{
            $pull  : { recievedRequest : {  _id : id }}
        },{ new : true })
        

        if(moneyreciever == null || !moneyreciever){
            return res.status(400).json({
                message : "Money Rejection Error"
            })
        }

            return  res.status(200).json({
            message  : "Rejected",
            user : {
                fullname : moneyreciever?.fullname,
                username : moneyreciever?.username,
                email : moneyreciever?.email,
                accountBalance: moneyreciever?.accountBalance,
                transactions : moneyreciever?.transactions,
                sentRequest : moneyreciever?.sentRequest,
                recievedRequest : moneyreciever?.recievedRequest,
            }
        })

    } catch (error) {
        return res.json({
            message : "Money not Rejection"
        });
    }
}
 


