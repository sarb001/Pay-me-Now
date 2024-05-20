
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
            console.log('all trans error',error);
    }
}


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
        console.log('paymoney error =',error);
    }
}


export const addMoney = async(req,res) => {
    try {
        const { modalamount  } = req.body;
        console.log('modal amount =',modalamount);

        const user = await User.findById(req.userid);
        console.log('main user=',user);

        if(modalamount < 1 || modalamount == ' ') return res.json({         
            message : " Invalid Amount "
        });
                // 620 + 9900 = 
             const  mybal = user?.accountBalance + Number(modalamount);

             if(mybal != ''){
                user.accountBalance = mybal;
                console.log('mybal -',mybal);
             }  
        
            await user.save();
            console.log('user mmoeuy',user);    

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
        console.log('add money error =',error);
    }
}


export const RequestMoney = async(req,res) => {
        try {
            
            const user = await User.findById(req.userid);
            console.log('main logged user =',user);

            const { modalamount , id , fullname } = req?.body;

            if(modalamount <= 1){
                return res.status(400).json({
                    message : "Amount should be greator than 1"
                })
             }

            const paymentid = new mongoose.Types.ObjectId(); 
            console.log('payment id new =',paymentid);

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
    
            console.log('main user ==',mainuserupdated);

            res.status(200).json({
                    message: " Money Requestedss ",
                    user : mainuserupdated
            })

        } catch (error) {
            console.log('request money error= ',error);  
        }
}


export const acceptmoney = async(req,res) => {
    try {
        
        const { amount , fullname , id } =    req?.body;
        console.log('acc fullname is | id is | amount is =',fullname,id,amount);

        const user = await User.findById(req?.userid);
        console.log('user logged =',user);      // manveer logged in 

        const payinguser = await User.findOne({fullname});
        console.log(' acc paying fullname =',payinguser);
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

        console.log('updated user=',updateduser);
      
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
        console.log('accept moneyerror =',error);
    }
}


export const  rejectmoney = async(req,res) => {
    try {
         
        console.log('req id =',req?.userid);
        const _id = req?.userid;        //logged user
        console.log('type _id is -',typeof(_id));

        const { amount , id  , fullname } = req?.body;
        console.log('reject moeny=',{ amount , id  , fullname });
        
        console.log('type id is -',typeof(id));

        const loggeduser = await User.updateOne(        
        {
            fullname : fullname,
            "sentRequest._id" : id
        },{ $set  : { "sentRequest.$.status" : "REJECT" },}
        )
        
        console.log('loggedduser =',loggeduser);
        
        const moneyreciever = await User.findByIdAndUpdate(
            _id
        ,{
            $pull  : { recievedRequest : {  _id : id }}
        },{ new : true })
        
        console.log('moneyreceiver =',moneyreciever);

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
        console.log('rejected money error =',error);
    }
}
 


